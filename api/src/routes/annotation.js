const AnnotationRoutes = (server, options, done) => {

  const { db } = options;
  
  /** Just gets a dummy token for testing **/
  server.post('/login', (req, res) => {
    const { accessToken } = req.body;
    
    if (accessToken) {
      try {
        // This will fail if the token could not be verified
        // against the secret
        const payload = server.jwt.verify(accessToken);

        res.setCookie('auth', accessToken, {
          httpOnly: true,
          sameSite: 'strict'
        }).code(200).send({ user: payload.sub });  
      } catch (error) {
        console.log(error);
        res.code(401).send({ error: 'Not Authorized' });
      }
    } else {
      res.code(401).send({ error: 'Not Authorized' });      
    }
  });

  server.get('/me', { onRequest: [ server.authenticate, server.authorize ] }, req => {
    // TODO retrieve the token and return username
    return { ...req.user };
  });

  server.get('/annotation/search', { onRequest: [ server.authenticate, server.authorize ] }, req =>
    db.findBySourceForUser(req.query.source, req.user.id));

  server.post('/annotation', { onRequest: [ server.authenticate ] }, req =>
    db.upsertAnnotation(req.body).then(() => ({ result: 'success' })));

  server.delete('/annotation/:annotationId', { onRequest: [ server.authenticate ] }, req =>
    db.deleteById(req.params.annotationId).then(() => ({ result: 'success' })));

  done();
  
}

export default AnnotationRoutes;
