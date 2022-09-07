import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

import Config from '../Config';

/**
 * Adds authentication middleware based on a JWT cookie.
 */
const JWTAuthenticationPlugin = fp(function (fastify, _, done) {
  fastify.register(jwt, {
    secret: Config.AUTH_SECRET,
    cookie: {
      cookieName: 'token',
      signed: false
    }
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  done();
});

export default JWTAuthenticationPlugin;