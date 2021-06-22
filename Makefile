.EXPORT_ALL_VARIABLES:
DB_CONN_PREFIX ?=mongodb
DB_HOST ?=localhost
DB_PORT ?=27017
DB_USERNAME ?=test
DB_PASSWORD ?=test
DB_DBNAME ?=test
DB_COLLECTION ?=test
DB_OPTIONS?=

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

run-dev-with-local-mongo:APP_PORT=8888
run-dev-with-local-mongo:
	@npm run watch:dev

# should change to your testing server
# DB_PORT is intentionally blank when using hostname to connect mongodb
run-dev-with-cloud-mongo:DB_CONN_PREFIX=mongodb+srv
run-dev-with-cloud-mongo:DB_HOST=<YOUR_CLOUD_MONGO_HOSTNAME>
run-dev-with-cloud-mongo:DB_PORT=
run-dev-with-cloud-mongo:DB_USERNAME=<YOUR_CLOUD_MONGO_USERNAME>
run-dev-with-cloud-mongo:DB_PASSWORD=<YOUR_CLOUD_MONGO_PASSWORD>
run-dev-with-cloud-mongo:DB_DBNAME=<YOUR_CLOUD_MONGO_DBNAME>
run-dev-with-cloud-mongo:DB_COLLECTION=<YOUR_CLOUD_MONGO_COLLECTION>
run-dev-with-cloud-mongo:DB_OPTIONS=retryWrites=true&w=majority
run-dev-with-cloud-mongo:APP_PORT=8888
run-dev-with-cloud-mongo:
	@npm run watch:dev

post-test-data:
	@curl --request POST \
	--url http://localhost:8888/patients \
	--header 'content-type: application/json' \
	--data '{"data": [{"name": "amy","orders": ["amy 超過120請施打8u","amy 9點要睡覺"]},{"name": "bob","orders": ["bob 超過999請施打8u"]},{"name": "cyber","orders": ["cyber 超過50請施打8u"]},{"name": "david","orders": ["david 超過90請施打8u"]},{"name": "ema","orders": ["ema 超過1請施打8u"]}]}'
