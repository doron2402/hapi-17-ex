'use strict';

const Hapi = require('hapi');
const PORT = process.env.PORT || 3000;
const server = Hapi.server({ port: PORT, host: 'localhost' });


const init = async () => {
    await server.register([
        require('inert'),
        {
            plugin: require('hapi-pino'),
            options: {
                prettyPrint: false,
                logEvents: ['response', 'error']
            }
        },
        {
            plugin: require('./plugins/db/index')
        },
        {
            plugin: require('./plugins/rides/index')
        }
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();