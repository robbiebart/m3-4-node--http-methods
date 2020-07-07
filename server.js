'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const { stock, customers } = require("./data/promo");

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  // endpoints
  .post("/order", (req, res) => {
    const {
        order,
        size,
        givenName,
        surname,
        email,
        address,
        city,
        province,
        postcode,
        country,
    } = req.body; 
    if (stock.bottles === 0 || stock.socks === 0 || )
    if (country !== "Canada") {
      res.json({'status': 'error', 'error': 'underliverable'});
    } res.json({status: "success"})
  })

  .get('*', (req, res) => res.send('Dang. 404.'))
  .listen(8000, () => console.log(`Listening on port 8000`));

  /*
we will now destructuring, which does req.body.order, size, etc
this post is responsible for any post made to this endpiont, we're making a postreq to 
this endpoint from your script
in this code you have access to all data from form, and from database
so here we do our comparison, and send back our response
  */