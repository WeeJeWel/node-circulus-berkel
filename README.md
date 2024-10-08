# Circulus Berkel API Client

![NPM Version](https://img.shields.io/npm/v/circulus-berkel)

This Node.js module is a wrapper around the https://www.circulus.nl website, and can retrieve a JSON and iCal feed when providing a Zipcode + Number.

## Installation

```bash
$ npm i circulus-berkel
```

## Usage

### As Webserver

```bash
$ circulus-berkel
Server listening on http://0.0.0.0:3000
```

```http
GET http://localhost:3000/?zipCode=7411KT&number=1&format=ical
GET http://localhost:3000/?zipCode=7411KT&number=1&format=json
```

### As Dependency

```javascript
import CirculusBerkel from 'circulus-berkel';

const circulusBerkel = new CirculusBerkel({
  zipCode: '7411KT',
  number: '1',
});

const iCalFeed = await circulusBerkel.getIcalFeed();
console.log(iCalFeed);

const jsonFeed = await circulusBerkel.getJsonFeed();
console.log(jsonFeed);
```