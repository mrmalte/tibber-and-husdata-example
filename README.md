# Tibber and Husdata demo

## Introduction

This is a small example that control an old heat pump so it only runs the least expensive hours every day. Modern heat pumps may have functionality like this built in but this solution may work if you have on old one.

Electricity needs to come from a electricity supplier and plan that charge by hour. The price every hour is set by [Nordpool](https://www.nordpoolgroup.com/en/Market-data1/Dayahead/Area-Prices/SE/Hourly/?view=table). In this example the electricity supplier [Tibber](https://tibber.com/) is used. Other supplier probably provides similar APIs as the ones Tibber provides to fetch price information. To access Tibbers API an API key must be created. This can be done when logged in to your Tibber account.

The [H66](https://husdata.se/produkt/h66-wifi-gateway/) gateway from [Husdata](https://husdata.se) enables communication with old heat pumps. Several protocols are supported like MQTT, Modbus TCP and like in this example REST API. Different heat pumps are controlled in different ways. In this example a IVT Greenline HE 11 (Rego 1000) the heat pump can be configured to block heating when an external port is triggered. The same can be done for warm water. The port can be triggered via H66.

Turning off heating on most expensive hours will work best if the heating system in the house is slow so indoor temperatures not will fluctuate too much. Temperature changes in modern houses with lots of concrete in the floors are usually slow.

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
