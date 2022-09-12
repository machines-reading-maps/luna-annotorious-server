import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

import Config from '../config';

/**
 * Adds authentication middleware based on a JWT cookie.
 */
const JWTAuthenticatePlugin = fp(function (fastify, _, done) {
  fastify.register(jwt, {
    secret: Buffer.from(Config.AUTH_SECRET, 'base64'),
    cookie: {
      cookieName: 'auth',
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

export default JWTAuthenticatePlugin;