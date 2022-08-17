import { test } from 'tap';

import API from '../src/API.js';

import MockDB from './MockDB.js';

test('requests the "/" route', async t => {
  const server = API(MockDB);

  const response = await server.inject({
    method: 'GET',
    url: '/'
  });

  t.equal(response.statusCode, 404, 'returns a status code of 200');
});
