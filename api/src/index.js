import API from './API.js';
import Config from './Config.js';

import db from './db/index.js';

db.exists().then(exists => {
  if (!exists)
    db.initDB();
});

const server = API(db);

const start = async () => {
  try {
    server.listen({ port: Config.API_PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();