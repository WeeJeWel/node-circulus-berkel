import nodeFetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';

export default class CirculusBerkel {

  zipCode = null; // e.g. "7411KT"
  number = null; // e.g. "1"
  street = null; // e.g. "Dorpsstraat"
  residence = null; // e.g. "Bathmen"
  addressType = null; // e.g. "H"
  municipality = null; // e.g. "Deventer"

  constructor({
    zipCode,
    number,
  }) {
    if (!zipCode) {
      throw new Error('zipCode is required');
    }
    this.zipCode = zipCode;

    if (!number) {
      throw new Error('number is required');
    }
    this.number = number;

    this.fetch = fetchCookie(nodeFetch);
  }

  async login() {
    await this.fetch('https://mijn.circulus.nl/register/zipcode.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        zipCode: this.zipCode,
        number: this.number,
      }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(async res => {
        if (res.success === false) {
          throw new Error(res.flashMessage);
        }

        let address = res.customData;

        if (Array.isArray(res.customData.addresses)) {
          address = res.customData.addresses[0]; // Select the first address

          const url = new URL(`https://mijn.circulus.nl${res.customData.addresses[0].authenticationUrl}`);
          await this.fetch(url);

          this.street = url.searchParams.get('street');
          this.addressType = url.searchParams.get('addressType');
          this.municipality = url.searchParams.get('municipality');
          this.residence = url.searchParams.get('residence');
        } else {
          this.street = res.customData.street;
          this.addressType = res.customData.addressType;
          this.municipality = res.customData.municipality;
          this.residence = res.customData.residence;
        }
      });
  }

  async getIcalFeed({

  } = {}) {
    await this.login();

    return this.fetch('https://mijn.circulus.nl/afvalkalender.ics')
      .then(res => res.text());
  }

  async getJsonFeed({
    from = '2024-08-01',
    till = '2024-08-31',
  } = {}) {
    await this.login();

    return this.fetch(`https://mijn.circulus.nl/afvalkalender.json?from=${from}&till=${till}`)
      .then(res => res.json())
      .then(res => res.customData.response);
  }

}