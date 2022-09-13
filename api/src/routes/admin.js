const AdminRoutes = (server, options, done) => {

  const { db } = options;

  server.get('/admin/recent', () => {
    // TODO make 'since' configurable
    const twoWeeksAgo = new Date(Date.now() - 12096e5);
    return db.listRecent(twoWeeksAgo);
  });

  done();

}

export default AdminRoutes;