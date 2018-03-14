'use strict';

const RIDES_TABLE = 'nex_rides';

exports.up = function(knex, Promise) {
  return knex.schema.table(RIDES_TABLE, (table) => {
    table.index(['start', 'end'], 'timestamp_index', 'btree');
    table.index(['driver_id', 'ride_id'], 'driver_ride_index', 'btree');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table(RIDES_TABLE, (table) => {
    table.dropIndex('timestamp_index');
    table.dropIndex('driver_ride_index');
  });
};
