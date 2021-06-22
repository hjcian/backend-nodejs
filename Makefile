.EXPORT_ALL_VARIABLES:
DB_HOST ?=localhost
DB_PORT ?=27017
DB_USERNAME ?=test
DB_PASSWORD ?=test
DB_DBNAME ?=test
DB_COLLECTION ?=test

stop-mongo:
	@echo "[`date`] Stopping previous launched Mongo [if any]"
	docker stop nismongo || true

mongo:
	@echo "[`date`] Starting Mongo container"
	@docker run -d --rm --name nismongo \
		-p ${DB_PORT}:27017 \
		-e MONGO_INITDB_ROOT_USERNAME=${DB_USERNAME} \
    	-e MONGO_INITDB_ROOT_PASSWORD=${DB_PASSWORD} \
		mongo:4.4

restart-mongo: stop-mongo
restart-mongo: mongo

run-local-dev:PORT=3333
run-local-dev:
	@npm run watch:dev