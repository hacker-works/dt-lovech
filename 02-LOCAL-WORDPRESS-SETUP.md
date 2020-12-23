# Local Wordpress Setup Log

As a prerequisite, you need to get installed `docker` and `docker-compose`.

```bash
cd wordpress
```

The needed configuration is in `wordpress/docker-compose.yml`

If the docker machine is not started run `open --background -a Docker` and wait 
for the Docker Desktop to initialize.  Then run `docker-compose up -d`. When 
ready you can open in the browser the Wordpress site at `http://localhost:8080`.

To shut it down run `docker-compose down`.

Follow the famous *5-minute Install*.

Alternatively, to run the local wordpress from scratch with cleaned volumes:
```bash
docker-compose down --volumes
docker-compose -f docker-compose.yml down --volumes
```
