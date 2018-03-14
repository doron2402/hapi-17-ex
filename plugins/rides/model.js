'use strict';
const Knex = require('knex')({ client: 'pg' });
const RidesModel = {};

RidesModel.getAllRides = async function({ query, server }) {
  const { limit, offset, start, end, interval = 24 * 60 * 60 } = query;

  // const sqlQuery = Knex.select('*').from('nex_rides').where('start', '>', start)
  // .andWhere('end', '<', end)
  // .limit(limit)
  // .offset(offset)
  // .toQuery();
  knex.select(``)
    let sqlQuery = Knex.select(Knex.raw('distinct on (time_interval) time_interval, driver_id, ride_id'))
    .from(Knex.raw(`(select to_timestamp((extract(epoch from start) / (${interval}))::int * ${interval}) as time_interval,
    driver_id, ride_id, start, end
    from nex_rides
    and start between '${start}' and '${end}') nex_rides`));
    sqlQuery = sqlQuery.orderByRaw('time_interval, abs(extract(epoch from start) - extract(epoch from time_interval))')
    .offset(offset)
    .limit(limit)
    .toString();

    console.log(sqlQuery);

  let res = null;
  const client = await server.app.pgClient.connect();
  try {
    res = await client.query(sqlQuery);
  } finally {
    client.release();
    if (res && res.rows && res.rows.length > 0) {
      return res.rows;
    }
    return null;
  }
}

module.exports = RidesModel;