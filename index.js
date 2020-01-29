'use strict';

const Hapi = require('@hapi/hapi');

require('dotenv').config()


const fsConfig = {
    cookie_password: process.env.COOKIE_PASSWORD
};

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.bind({
    users: {},
    donations: []
});

async function init() {
    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/vision'));
    await server.register(require('@hapi/cookie'));

    server.views({
        engines: {
            hbs: require('handlebars'),
        },
        relativeTo: __dirname,
        path: './app/views',
        layoutPath: './app/views/layouts',
        partialsPath: './app/views/partials',
        layout: true,
        isCached: false,
    });


    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'donation',
            password: fsConfig.cookie_password,
            isSecure: false
        },
        redirectTo: '/',
    });

    server.auth.default('session');

    server.route(require('./routes'));
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}


process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

init();