const express = require('express');
const path = require('path');
var parser = require('body-parser');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 5000

express()
  .use(parser.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(parser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/nasaDateSubmit', (req, res) => {
  	console.log(req.body);
  	var data = "";
  	const spaceURL = 'https://api.nasa.gov/planetary/apod?api_key=Aj3aZZ1ZX9H5YfwheMgVWGyYVwghvILvpOU9MGvt&date=' + req.body.searchdate;

  	fetch(spaceURL)
  	.then(response => response.json())
  	.then(data => {
  		console.log(data)
  		res.send(data)
  	})
  })

  .post('/bingDateSubmit', (req, res) => {

    var data = "";
    const bingURL = 'https://bing.biturl.top/?resolution=1920&format=json&index=' + req.body.searchdate + '&mkt=en-US';

    fetch(bingURL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      res.send(data)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
