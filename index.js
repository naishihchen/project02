const express = require('express');
const path = require('path');
var parser = require('body-parser');
const PORT = process.env.PORT || 5000

express()
  .use(parser.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(parser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/dateSubmit', (req, res) => {
  	console.log(req.body);
  	console.log("Flag");
  	var data = "";
  	const spaceURL = 'https://api.nasa.gov/planetary/apod?api_key=Aj3aZZ1ZX9H5YfwheMgVWGyYVwghvILvpOU9MGvt&date=' + req.body.searchdate;

  	fetch(spaceURL)
  	.then(response => data = response.json())

  	res.send(data);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
