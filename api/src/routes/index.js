module.exports = (server, options, done) => {

  const { db } = options;
  
  /** Just gets a dummy token for testing **/
  server.get('/login', (req, res) => {
    const token = server.jwt.sign({ id: 'https://rainersimon.io/users/rainer', fullname: 'Rainer Simon' });

    res.setCookie('token', token, {
      // TODO needs extra params for security!
    }).code(200).send({ token });
  });

  server.get('/me', { onRequest: [ server.authenticate ] }, req => {
    // TODO retrieve the token and return username
    return 'Hello World';
  });

  server.get('/annotation/search', req =>
    db.findBySource(req.query.source));

  server.post('/annotation', req =>
    db.upsertAnnotation(req.body).then(() => ({ result: 'success' })));

  server.delete('/annotation/:annotationId', req =>
    db.deleteById(req.params.annotationId).then(() => ({ result: 'success' })));

  server.get('/', req => ({ ...req.user }));

  done();
  
}
