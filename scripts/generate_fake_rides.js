'use strict';
/**
 * Generate 2500 fake rides
 * and insert them to the db
 */
const Faker = require('faker');
const fs = require('fs')
const wstream = fs.createWriteStream('./seeds/rides.json');

let i =0;
const MAX_NUMBER = 100;
wstream.write('[');
while (i < MAX_NUMBER) {
  const start =  Faker.date.between('2010-01-01', '2018-01-01');
  const tmpObj = {
    driver_id: Faker.random.uuid(),
    ride_id: Faker.random.uuid(),
    start: parseInt(start.getTime()/1000),
    end: parseInt(Faker.date.between(start, '2018-03-01')/1000)
  }
  wstream.write(JSON.stringify(tmpObj));

  i++;
  if (i < MAX_NUMBER) {
    wstream.write(',');
  }
}
wstream.write(']');
wstream.end();