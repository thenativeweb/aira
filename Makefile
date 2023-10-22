qa: analyze test

analyze:
	@go vet ./...
	@go run honnef.co/go/tools/cmd/staticcheck@latest --checks=all ./...

test:
	@go test -failfast -cover ./...

.PHONY: analyze \
				qa \
				test
