# Tibber och Husdata demo

[English](README.md)

## Introduktion

Här är ett exempel på hur man kan styra en gammal värmepump så att den bara kör de billgaste timmarna under dygnet. Exemplet hoppar över de fem dyraste timmarna. Nya värmepumpar har troligtvis liknande funktionalitet inbyggt men denna lösningen kan fungera för en gammal.

För att detta skall fungera så måste elen komma via ett abonnemang med timdebitering. Priset för elen varje timme sätts av [Nordpool](https://www.nordpoolgroup.com/en/Market-data1/Dayahead/Area-Prices/SE/Hourly/?view=table). I detta exempel används [Tibber](https://tibber.com/). Andra elleverantörer tillhandahåller troligtvis liknande APIer för att hämta elpriser. För att komma åt Tibbers APIer måste man ha ett abonnemang och sedan skapa en API nyckel. 

[H66](https://husdata.se/produkt/h66-wifi-gateway/) gateway från [Husdata](https://husdata.se) gör det möjligt att kommunicera med en gammal värmepump. Ett flertal protokoll kan användas som MQTT, Modbus TCP eller som i detta exempel ett REST API. Olika värmepumpsmodeller går att styra på olika sätt. I detta exempel används en IVT Greenline HE 11 (Rego 1000) värmepump. Denna kan konfigureras så att värme- eller varmvatten-produktion kan blockeras.

## Förkrav

### NodeJS och npm

NodeJS och npm måste finnas tillgängligt i systemet.

### Värmepump

Värmepumpen måste konfigureras för att blockera värme. Hur man gör detta framgår av värmepumpens och och [H66](https://husdata.se/docs/h60-manual/energistyrning-guider/) manualer.

### H66

[REST API](https://husdata.se/docs/h60-manual/api-integration/) måste slås på. IP adressen till H66 behövs när man skall köra exemplet.

### Tibber

Man måste vara kund hos Tibber. En API nyckel kan skapas på "mina sidor" på Tibbers sida.

## Köra exemplet

Installera beroenden

```sh
> npm install
```

Uppdatera .env filen så att den ser ut något i stil med:

```text
TIBBER_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
H66_HTTP_ADDRESS=http://192.168.1.8
TIBBER_API_URL=https://api.tibber.com/v1-beta/gql
```

Bygg och kör exemplet:

```sh
> npm run build && npm start
```

Om allt fungerar så borde något i stil med följande komma ut på skärmen:

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

Applikationen kommer att kolla om värmen skall blockeras varje timme och då kommer samma utskrift igen.
