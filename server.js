"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { stock, customers } = require("./data/promo");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")

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

    let response = { status: "success" };

    if (order === "bottles") {
      if (stock.bottles < 1) {
        response = { status: "error", error: "unavailable" };
      }
    } else if (order === "socks") {
      if (stock.socks < 1) {
        response = { status: "error", error: "unavailable" };
      }
    } else if (order === "shirt") {
      if (stock.shirt["size"] < 1) {
        response = { status: "error", error: "unavailable" };
      }
    } else if (country !== "Canada") {
      response = { status: "error", error: "underliverable" };
    }

    // if (customers.find((cust) =>  cust.email === email)) {
    //   res.json({ status: "error", error: "repeat-customer"});
    // }

    if (
      customers.find((customer) => {
        return customer.email === email;
      })
    ) {
      response = { status: "error", error: "repeat-customer" };
    }

    res.json(response);
  })

  .get("/order-confirmed", (req, res) => {
    res.render("./views/index");
  })

  .get("*", (req, res) => res.send("Dang. 404."))
  .listen(8000, () => console.log(`Listening on port 8000`));

// .get('/order-confirmed', (req, res) => {
//   res.render("/order-confirmed.html");
// })
/*
we will now destructuring, which does req.body.order, size, etc
this post is responsible for any post made to this endpiont, we're making a postreq to 
this endpoint from your script
in this code you have access to all data from form, and from database
so here we do our comparison, and send back our response
  */
