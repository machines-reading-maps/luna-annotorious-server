import fp from 'fastify-plugin';
import JWT from '@fastify/jwt';

import Config from '../Config';

module.exports = fp(function (fastify, opts, done) {

  fastify.register(JWT, {
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