#!/usr/bin/env node
'use strict' // <<--- allows for es6 syntax (const, let, etc)

const express = require('express');
const PORT = process.env.PORT || 3000;
const path = require('path'); // included with node but needs to be required
const chalk = require('chalk');
const request = require('request');
const bodyParser = require('body-parser');
const _ = require("lodash");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// renders in the index.jade file, #{title} #{date}
app.get('/', (req, res) => {
  res.render('index', {
    title: 'my Shuper Shweet App',
    date: new Date()
  });
});



app.get('/hello', (req, res) => {

  const name = req.query.name;
  const msg = `<h1>Hey ${name} Duuude!!!</h1>`; // <<--- remember `backticks`

  res.writeHead(200, {
    'Content-type' : 'text/html'
  });



app.use(express.static(path.join(__dirname, 'public')));

  msg.split('').forEach((char, i) => {

    setTimeout(() => {

      res.write(char);
      console.log(char);

    }, 1000 * i);

  });

  setTimeout(() => {
    res.end();
  }, msg.length * 1000 + 2000);
});



// generates random number in the range of what is passes to url in 1st line (ex. localhost:3000/random/2/10)
app.get('/random/:min/:max', (req, res) => {
  var min = parseInt(req.params.min);
  var max = parseInt(req.params.max);
  console.log(min);
  console.log(max);
  res.end(Math.floor(Math.random() * (max - min) + min).toString());
});



app.get('/api', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // <<-- using postman to get and post json
  res.send({hello: "world"});
});



app.post('/api', (req, res) => {  // <<-- sending/posting json data
  res.header("Access-Control-Allow-Origin", "*");
  const obj = _.mapValues(req.body, val => val.toUpperCase());
  res.send(obj);
});



app.get('/api/weather', (req, res) => {
  const API_KEY = '16e02ac1674b1c946df19c3e18856771';
  const url = `https://api.forecast.io/forecast/${API_KEY}/37.8267,-122.423`;

  request.get(url, (err, response, body) => {   // <<-- "err" is always first argument of node callbacks
    if(err) throw err;  // <<-- generally best practice for handleing errors

    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.parse(body));
  });
});



app.get('/secret', (req, res) => {
  res
    .status(403)
    .send('Access Denied!!!')
});



app.listen(PORT, () => {
  console.log(chalk.magenta.bold('Node.js server started. ') + chalk.red.bold.bgYellow(`Listening on PORT ${PORT}`));
});

//  <<<<<< BELOW IS BEFORE INSTALLING AND USING EXPRESS >>>>>>>

// const http = require('http');
// const app = require('express')();
// const PORT = process.env.PORT || 3000;
// const chalk = require('chalk');

// http.createServer((req, res) => {

//   console.log(req.method, req.url);

//   if(req.url === '/hello') {
//     const msg = "<h1>Hey Duuude!!!</h1>";

//     res.writeHead(200, {
//       'Content-type' : 'text/html'
//     });
//     const events = [];

//     msg.split('').forEach((char, i) => {

//       const event = setTimeout(() => {

//         res.write(char);
//         console.log(char);

//         events.pop(events);

//       }, 1000 * i);

//       events.push(event);

//     });

//     setInterval(() => {

//       if(!events.length) {
//         res.end();
//       }

//     }, 1000);

//   } else if (req.url === '/random') {

//     res.end(Math.random().toString());

//   } else {

//     res.writeHead(403);
//     res.end('Access Denied!!!')

//   };

//   res.writeHead(200, {
//     'Content-type' : 'text/html'
//   });
// }).listen(PORT, () => {
//   console.log(chalk.magenta.bold('Node.js server started. ') + chalk.red.bold.bgYellow('Listening on PORT ' + PORT));
// });
