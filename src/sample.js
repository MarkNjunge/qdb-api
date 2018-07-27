//@ts-check
const qdb = require('./qdb-api');

qdb
  .search('ac')
  .then(quotes => {
    quotes.forEach(quote => {
      console.log(quote);
    });
  })
  .catch(reason => {
    console.log(reason);
  });

qdb
  .get(6960)
  .then(quote => {
    console.log(quote);
  })
  .catch(reason => {
    console.log(reason.message);
  });

qdb
  .random()
  .then(quote => {
    console.log(quote);
  })
  .catch(reason => {
    console.log(reason);
  });

qdb
  .latest()
  .then(quote => {
    console.log(quote);
  })
  .catch(reason => {
    console.log(reason);
  });
