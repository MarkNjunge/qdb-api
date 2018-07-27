const axios = require('axios').default;
const cheerio = require('cheerio');

const baseUrl = 'http://www.qdb.us';

function getQuote(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/${id}`)
      .then(response => {
        const $ = cheerio.load(response.data);

        const id = parseInt(
          $('#vt > table > tbody > tr:nth-child(2) > td > a')
            .text()
            .substring(1)
        );

        const text = $('.qt').text();

        let positiveVotes = 0;
        let totalVotes = 0;

        $('span').each((i, e) => {
          if (e.attribs.id == `qs[${id}]`) {
            parseInt((positiveVotes = e.children[0].data));
          }

          if (e.attribs.id == `qvc[${id}]`) {
            parseInt((totalVotes = e.children[0].data.split('/')[1]));
          }
        });

        const quote = {
          id,
          positiveVotes,
          totalVotes,
          text
        };

        resolve(quote);
      })
      .catch(reason => reject(reason));
  });
}

function getRandomId() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/random`)
      .then(response => {
        const $ = cheerio.load(response.data);

        const id = $('#vt > table > tbody > tr:nth-child(2) > td > a')
          .first()
          .text()
          .substring(1);

        resolve(id);
      })
      .catch(reason => reject(reason));
  });
}

function getLatestId() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/latest`)
      .then(response => {
        const $ = cheerio.load(response.data);

        const id = $('#vt > table > tbody > tr:nth-child(2) > td > a')
          .first()
          .text()
          .substring(1);

        resolve(id);
      })
      .catch(reason => reject(reason));
  });
}
/**
 *
 * @param {String} query The search term
 * @param {String} order quote_id , real_score or score. Default: score
 * @param {String} sort desc or asc. Default: desc
 * @param {Number} limit Number of responses. Default: 10
 * @param {Number} approved 1 for approved, 0 for pending, -1 for all. Default: 1
 */
function search(
  query,
  order = 'score',
  sort = 'desc',
  count = 10,
  approved = 1
) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${baseUrl}/search?q=${query}&order=${order}&sort=${sort}&limit=${count}&approved=${approved}`
      )
      .then(response => {
        const $ = cheerio.load(response.data);

        const quotes = [];

        if (
          $('body > center > div > p > span')
            .text()
            .includes('Sorry, your search query returned no results.')
        ) {
          reject('No results returned.');
        } else {
          const promises = [];
          for (let index = 0; index < count; index++) {
            const id = $(
              `#vt > table > tbody > tr:nth-child(${2 + index}) > td > a`
            )
              .text()
              .split('#')[1];

            promises.push(getQuote(id).then(quote => quotes.push(quote)));
          }

          Promise.all(promises)
            .then(() => {
              resolve(quotes);
            })
            .catch(err => reject(err));
        }
      })
      .catch(reason => reject(reason));
  });
}

module.exports = {
  get: id => {
    return getQuote(id);
  },
  random: () => {
    return getRandomId().then(id => getQuote(id));
  },
  latest: () => {
    return getLatestId().then(id => getQuote(id));
  },
  search
};
