import CirculusBerkel from '../index.mjs';

const circulusBerkel = new CirculusBerkel({
  zipCode: '7411KT',
  number: '1',
});
const iCalFeed = await circulusBerkel.getIcalFeed();
console.log(iCalFeed);
