build-fe:
	npx vite build
	docker build -t rdzhei/croissant -f ./docker/croissant/Dockerfile .
	docker push rdzhei/croissant

up:
	docker compose -f ./docker/docker-compose.yml -p la-croissant up -d
