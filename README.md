# Luna Annotorious Server

A server backend for user-contributed annotations, 
built with [Fastify](https://www.fastify.io/) and
[RethinkDB](https://rethinkdb.com/).


## Running in Development Mode

In development mode, you'll run RethinkDB as a docker image, and the Fastify API via commandline.

```sh
$ cd api
$ docker-compose up
```

This launches RethinkDB. The admin interface will be available at <http://localhost:8080>. Then in another terminal:

```sh
$ npm install
$ npm run dev
```

This starts the Fastify server at <http://localhost:3000>.