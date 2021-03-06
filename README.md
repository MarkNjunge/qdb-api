# qdb-api

[![NPM](https://nodei.co/npm/qdb-api.png)](https://npmjs.org/package/qdb-api)  

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMarkNjunge%2Fqdb-api.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FMarkNjunge%2Fqdb-api?ref=badge_shield)

An API wrapper for [qdb.us](http://www.qdb.us/).

Looking for a REST API? See [qdb-rest-api](https://github.com/MarkNjunge/qdb-rest-api)

`npm install qdb-api`

```Javascript
const qdb = require('qdb-api')
```

## APIs available

- Get a random quote
- Get the latest quote
- Get specific quote by it's id
- Search for a quote

### Get a random quote

```Javascript
qdb.random()
	.then(quote => {
		console.log(quote);
	})
	.catch(reason => {
		console.log(reason);
	});
```

### Get the latest quote

```Javascript
qdb.latest()
	.then(quote => {
		console.log(quote);
	})
	.catch(reason => {
		console.log(reason);
	});
```

### Get a specific quote by it's id

```Javascript
qdb.get(4680)
	.then(quote => {
		console.log(quote);
	})
	.catch(reason => {
		console.log(reason);
	});
```

### Search for a quote

```Javascript
qdb.search('tom')
	.then(quotes => {
		quotes.forEach(quote => {
			console.log(quote);
		});
	})
	.catch(reason => {
		console.log(reason);
	});
```

# Disclaimer

Please note that is an unofficial API.

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMarkNjunge%2Fqdb-api.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FMarkNjunge%2Fqdb-api?ref=badge_large)
