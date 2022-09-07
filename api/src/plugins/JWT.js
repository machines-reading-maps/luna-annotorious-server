import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

import Config from '../Config';

module.exports = fp(function (fastify, opts, done) {
  fastify.register(jwt, {
    secret: Config.AUTH_SECRET,
    cookie: {
      cookieName: 'token',
      signed: false
    }
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  });

  done();
});