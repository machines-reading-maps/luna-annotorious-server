# Luna Annotorious Server

A server backend for user-contributed annotations, 
built with [Fastify](https://www.fastify.io/) and
[RethinkDB](https://rethinkdb.com/).


## Development Mode

In development mode, you'll run RethinkDB as a Docker image, and the Fastify API via commandline.

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

## Deployment

In normal production deployment, you'll run the whole stack with Docker. The application consists of three containers:

- RethinkDB
- The Fastify API server
- NGINX as a frontend proxy

In the root folder, run:

```sh
$ docker-compose up
```

The API is available at <http://localhost>. Note that the RethinkDB admin interface is __not__ exposed in production.