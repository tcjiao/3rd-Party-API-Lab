var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const ROOT_URL = 'https://api.chucknorris.io';

/* GET home page. */
router.get('/', function(req, res, next) {
  fetch(`${ROOT_URL}/jokes/categories`)
    .then(response => response.json())
    .then(categories => {
      res.render('index', { joke: null, categories });
    })
    .catch(error => {
      console.error(error);
      res.render('index', { joke: null, categories: [] });
    });
});

router.get('/joke', function(req, res, next) {
  const category = req.query.category;
  let apiUrl = `${ROOT_URL}/jokes/random`;
  if (category) {
    apiUrl += `?category=${category}`;
  }
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      fetch(`${ROOT_URL}/jokes/categories`)
        .then(response => response.json())
        .then(categories => {
          res.render('index', { joke: data.value, categories });
        })
        .catch(error => {
          console.error(error);
          res.render('index', { joke: null, categories: [] });
        });
    })
    .catch(error => {
      console.error(error);
      res.render('index', { joke: null, categories: [] });
    });
});

module.exports = router;