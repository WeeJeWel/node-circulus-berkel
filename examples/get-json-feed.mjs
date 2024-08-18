import CirculusBerkel from '../index.mjs';

const circulusBerkel = new CirculusBerkel({
  zipCode: '7411KT',
  number: '1',
});
const jsonFeed = await circulusBerkel.getJsonFeed();
console.log(jsonFeed);
