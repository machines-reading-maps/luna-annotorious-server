# Luna Annotorious Server

A server backend for user-contributed annotations, 
built with [Fastify](https://www.fastify.io/) and
[RethinkDB](https://rethinkdb.com/).


## Development

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

<details>
<summary>HTTPS Setup</summary>
Installation of HTTPS certificates via Certbot and LetsEncrypt is prepared in the Docker setup,
but requires manual steps. The process is based on [this guide](https://mindsers.blog/post/https-using-nginx-certbot-docker/).

In the CLI-commands below, replace `annotation-server.rainersimon.io` with the domain name of your server.

### 1. Test if the setup works correctly

```sh
docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d annotation-server.rainersimon.io
```

#### 2. Test if the setup works correctly

With HTTPS still disabled, download certificate from LetsEncrypt:

```sh
docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d annotation-server.rainersimon.io
```

#### 3. After the certificate is available

- Edit NGINX config file in `nginx/conf/default.conf` and uncomment the HTTPS config block.
- Restart everything with `docker-compose up --build`
</details>

## Using the Example

The `/example` folder contains an example HTML file you can use to test the setup. Make sure the production deployment
is running, and open `/example/index.html` in your browser.