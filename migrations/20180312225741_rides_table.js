'use strict';

const RIDES_TABLE = 'nex_rides';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(RIDES_TABLE, function (table) {
    table.uuid('driver_id').comment('driver id uuid');
    table.uuid('ride_id').comment('ride id uuid');
    table.bigInteger('start').comment('end timestamp (seconds)');
    table.bigInteger('end').comment('end timestamp (seconds)');
    table.jsonb('body').comment('body will hold unindexed meta data');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(RIDES_TABLE);
};
