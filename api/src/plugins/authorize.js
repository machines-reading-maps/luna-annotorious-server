import fp from 'fastify-plugin';

/**
 * An authorization plugin that validates the annotation payload
 * against the current user, to make sure users don't submit 
 * changes to annotations under somebody else's name. 
 */
const AuthorizePlugin = fp(function (fastify, options, done) {

  fastify.decorate('authorize', async (request, reply) => {
    try {
      // TODO if this is a new annotation, check if all bodies are from this user
      // TODO if this is an update, compute diff - check if modified bodies are from this user
      // console.log('authorize', request.user);
    } catch (err) {
      reply.send(err)
    }
  });

  done();

});

export default AuthorizePlugin;