# Tibber and Husdata demo

[Swedish](README.sv.md)

## Introduction

This is a small example that controls an old heat pump so it only runs the least expensive hours every day. The example will skip the five most expensive hours. Modern heat pumps may have functionality like this built in but this solution may work if you have on old one.

Electricity must be supplied from an electricity supplier that charge by hour. The price every hour is set by [Nordpool](https://www.nordpoolgroup.com/en/Market-data1/Dayahead/Area-Prices/SE/Hourly/?view=table). In this example the electricity supplier [Tibber](https://tibber.com/) is used. Other supplier probably provides similar APIs as the ones Tibber provides to fetch price information. To access Tibbers API an API key must be created. This can be done when logged in to your Tibber account.

The [H66](https://husdata.se/produkt/h66-wifi-gateway/) gateway from [Husdata](https://husdata.se) enables communication with old heat pumps. Several protocols are supported like MQTT, Modbus TCP and as in this example REST API. Different heat pumps are controlled in different ways. In this example, an IVT Greenline HE 11 (Rego 1000) heat pump, can be configured to block heating when an external port is triggered. The same can be done for warm water. The port can be triggered via H66.

## Prerequisite

### NodeJS and npm

NodeJS and npm need to be installed on the system.

### Heat pump

The heat pump must be configured to block heating. See the the manual for the heat pump and [H66 documantation](https://husdata.se/docs/h60-manual/energistyrning-guider/).

### H66

The [REST API](https://husdata.se/docs/h60-manual/api-integration/) must be enabled. The IP address to H66 is needed when running the example.

### Tibber

You need to be a customer to Tibber. An API key can be created in your account pages at Tibber.

## Running

Install dependencies

```sh
> npm install
```

Update .env file so it looks something like the following:

```text
TIBBER_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
H66_HTTP_ADDRESS=http://192.168.1.8
TIBBER_API_URL=https://api.tibber.com/v1-beta/gql
```

Build and run

```sh
> npm run build && npm start
```

The output will be something like the following if everything works as expected.

```text
> tibber-and-husdata-example@0.0.1 start
> node dist/main


Time: 2023-09-14T12:51:05.718+02:00
0: price: 0.2882 run: true
1: price: 0.2867 run: true
2: price: 0.2832 run: true
3: price: 0.2849 run: true
4: price: 0.2904 run: true
5: price: 1.6752 run: true
6: price: 2.211 run: true
7: price: 2.7855 run: false
8: price: 2.4381 run: false
9: price: 1.8847 run: true
10: price: 1.5682 run: true
11: price: 1.4901 run: true
12: price: 1.485 run: true
13: price: 1.4613 run: true
14: price: 1.4386 run: true
15: price: 1.4619 run: true
16: price: 1.5285 run: true
17: price: 1.8671 run: true
18: price: 2.7057 run: false
19: price: 3.5606 run: false
20: price: 2.8966 run: false
21: price: 2.1134 run: true
22: price: 1.8268 run: true
23: price: 1.6063 run: true
Calling http://192.168.1.8/api/set?idx=2233&val=0
```

The application will check if the heat-pump should be turned on every hour so this print will be repeated.
