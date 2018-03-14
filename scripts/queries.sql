-- useful queries
-- break column per day
WITH ct AS (
  SELECT EXTRACT('days' FROM day - MIN(day) OVER()) + 1 AS rn, sub.*
    FROM (
     SELECT
          driver_id,
          DATE_TRUNC('day', to_timestamp(start)) AS day,
          COUNT(ride_id) AS total_ride
       FROM nex_rides
      WHERE to_timestamp(start) BETWEEN TIMESTAMP to_timestamp(1262304000)
		and TIMESTAMP to_timestamp(1262736000)
      GROUP BY 1,2
    ) AS sub
)
SELECT e.driver_id
       , d1.total_ride AS "day 1"                                             -- add as many as you need
       , d2.total_ride AS "day 2"
       , d3.total_ride AS "day 3"
  FROM (SELECT DISTINCT driver_id FROM ct) e
  LEFT JOIN (SELECT driver_id, total_ride FROM ct WHERE rn = 1) d1 USING(driver_id) -- add as many as you need
  LEFT JOIN (SELECT driver_id, total_ride FROM ct WHERE rn = 2) d2 USING(driver_id)
  LEFT JOIN (SELECT driver_id, total_ride FROM ct WHERE rn = 3) d3 USING(driver_id)
  ORDER BY e.driver_id;

-- create timeseries with unix
WITH n(ow) AS (VALUES(DATE_TRUNC('day', NOW())))
SELECT date_part('epoch',GENERATE_SERIES(n.ow + '-5 days', n.ow, '1 day') )::int
FROM n

-- create utc timeseries
WITH n(ow) AS (VALUES(DATE_TRUNC('day', NOW())))
SELECT GENERATE_SERIES(n.ow + '-5 days', n.ow, '1 day')
FROM n


