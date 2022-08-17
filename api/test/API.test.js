import { test } from 'tap';

import API from '../src/API.js';

import MockDB from './MockDB.js';

test('requests the "/annotation/search" route', async t => {
  const server = API(MockDB);

  const response = await server.inject({
    method: 'GET',
    url: '/annotation/search?source=http://example.com/images/001'
  });

  t.equal(response.statusCode, 200, 'returns a status code of 200');
});

test('requests the "/annotation" POST method', async t => {
  const server = API(MockDB);

  const response = await server.inject({
    method: 'POST',
    url: '/annotation'
  });

  t.equal(response.statusCode, 200, 'returns a status code of 200');
});

test('requests the "/annotation" DELETE method', async t => {
  const server = API(MockDB);
  
  const response = await server.inject({
    method: 'DELETE',
    url: '/annotation/ceabd881-06cb-4d6e-a5c6-3490a7931bc7'
  });

  t.equal(response.statusCode, 200, 'returns a status code of 200');
});
