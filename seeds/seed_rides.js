'use strict';
const RIDES_TABLE = 'nex_rides';
const rides_data = require('./rides.json');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(RIDES_TABLE).del()
    .then(function () {
      // Inserts seed entries
      return knex(RIDES_TABLE).insert(rides_data);
    });
};
