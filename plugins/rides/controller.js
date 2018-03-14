'use stirct';

const RidesModel = require('./model');
const Hoek = require('hoek');
const Boom = require('boom');

module.exports = {
  getAllRides: async function (request, h) {
    const rides = await RidesModel.getAllRides(request);

    if (!rides || rides === null || rides.length === 0) {
      return Boom.notFound('rides not found');
    }
    return rides;
  },
  getRideByDriverId: async function (request, h) {
    const rides = await RidesModel.getRideByDriverId(request);

    if (!rides || rides === null || rides.length === 0) {
      return Boom.notFound('rides not found');
    }
    return rides;
  }
};