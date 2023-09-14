import "module-alias/register";

import got from "got";
import { DateTime, Settings } from "luxon";
import { IConfig, TibberQuery } from "tibber-api";
import { IPrice } from "tibber-api/lib/src/models/IPrice";

import { env, logger, sleep } from "./utils";

// Make sure to use correct timezone
Settings.defaultZone = "Europe/Stockholm";

interface Schedule {
  [key: number]: boolean;
}

const fetchPricesFromTibber = async (): Promise<IPrice[]> => {
  const apiKey = env.tibberApiKey;
  const queryUrl = env.TibberApiUrl;
  const config: IConfig = {
    active: true,
    apiEndpoint: {
      apiKey,
      queryUrl,
    },
    timestamp: true,
    power: true,
  };
  const query = new TibberQuery(config);
  const homeIds = await query.getHomes();

  return query.getTodaysEnergyPrices(homeIds[0].id);
};

const createSchedule = (prices: IPrice[]): Schedule => {
  const priceLimit = prices.sort(
    (priceA, priceB) => priceB.total - priceA.total
  )[5].total;
  const schedule: Schedule = {};
  for (const { total, startsAt } of prices) {
    schedule[DateTime.fromISO(startsAt).hour] = total <= priceLimit;
  }
  return schedule;
};

const printSchedule = (prices: IPrice[], schedule: Schedule) => {
  logger.info(`\nTime: ${DateTime.now().toString()}`);
  prices.sort(
    (a, b) =>
      DateTime.fromISO(a.startsAt).hour - DateTime.fromISO(b.startsAt).hour
  );
  for (let idx = 0; idx < 24; idx++) {
    logger.info(`${idx}: price: ${prices[idx].total} run: ${schedule[idx]}`);
  }
};

const setH66Register = async (val: "0" | "1") => {
  // Enable or block heating by changing EXT1 on address 2233
  // 1 means block heat
  await got.get(`${env.H66HttpAddress}/api/set?idx=2233&val=${val}`);
  logger.info(`Calling ${env.H66HttpAddress}/api/set?idx=2233&val=${val}`);
};

const main = async () => {
  while (true) {
    const now = DateTime.now();
    const prices = await fetchPricesFromTibber();
    const schedule = createSchedule(prices);

    printSchedule(prices, schedule);
    if (schedule[now.hour]) {
      setH66Register("0");
    } else {
      setH66Register("1");
    }

    // Wait until next hour
    await sleep(
      +DateTime.local(now.year, now.month, now.day, now.hour + 1) - +now
    );
  }
};

main();
