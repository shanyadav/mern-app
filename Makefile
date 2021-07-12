build:
	cd admin && $(MAKE) build
	cd user && $(MAKE) build
	cd backend && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down