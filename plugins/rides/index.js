'use strict'

const Joi = require('joi');

const RidesController = require('./controller');

async function register (server, options) {
  server.route([{
    method: 'GET',
    path: '/rides',
    handler: RidesController.getAllRides,
    config: {
      validate: {
        query: {
          start: Joi.number().required().min(0).description('start time (unix timestamp) seconds'),
          end: Joi.number().required().min(Joi.ref('start')).description('start time (unix timestamp) seconds'),
          offset: Joi.number().integer().min(0).default(0).description('offset number of results'),
          limit: Joi.number().integer().min(1).default(1000).description('limit number of results (default 1000)')
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/drivers/{driver_id}',
    handler: RidesController.getRideByDriverId,
    config: {
      validate: {
        params: {
          driver_id: Joi.string().uuid().required().description('driver id is required')
        },
        query: {
          start: Joi.number().required().min(0).description('start time (unix timestamp) seconds'),
          end: Joi.number().required().min(Joi.ref('start')).description('start time (unix timestamp) seconds')
        }
      }
    }
  }]);
}

module.exports = {
  register,
  name: 'users-plugins-v1.0.0'
}