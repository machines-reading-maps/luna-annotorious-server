import Fastify from 'fastify';
import JWT from '@fastify/jwt';
import Cookie from '@fastify/cookie';

const API = (db, opts = {}) => {
  const server = Fastify(opts);

  server.register(Cookie);

  server.register(JWT, {
    secret: 'supersecret',
    cookie: {
      cookieName: 'token',
      signed: false
    }
  });
  
  server.addHook('onRequest', async (request, reply) => {
    try {
      // Adds user info to request object if user is logged in
      await request.jwtVerify();
    } catch (err) {
      // Do nothing (anonymous user)
    }
  });

  /** Just gets a dummy token for testing **/
  server.get('/login', (req, res) => {
    const token = server.jwt.sign({ id: 'https://rainersimon.io/users/rainer', fullname: 'Rainer Simon' });

    res.setCookie('token', token, {
      // TODO needs extra params for security!
    }).code(200).send({ token });
  });

  server.get('/annotation/search', req =>
    db.findBySource(req.query.source));

  server.post('/annotation', req =>
    db.upsertAnnotation(req.body).then(() => ({ result: 'success' })));

  server.delete('/annotation/:annotationId', req =>
    db.deleteById(req.params.annotationId).then(() => ({ result: 'success' })));

  server.get('/', req => ({ ...req.user }));

  return server;
}

export default API;