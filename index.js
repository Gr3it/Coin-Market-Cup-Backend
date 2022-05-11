const express = require("express");
const axios = require("axios");
const { response } = require("express");
const app = express();

const limit = 1000;
const currency = "EUR";

let listingData; //Only development (remove api spam) remove in production
let coinInfo = []; //Only development (remove api spam) remove in production

app.get("/listings/latest", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (listingData) {
    res.send(listingData); //Only development (remove api spam) remove in production
    return;
  }
  axios
    .get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}&convert=${currency}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_KEY,
        },
      }
    )
    .then((response) => {
      listingData = response.data;
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/info/:id", (req, res) => {
  if (coinInfo[req.params.id]) {
    res.send(coinInfo[req.params.id]); //Only development (remove api spam) remove in production
    return;
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  axios
    .get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${req.params.id}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_KEY,
        },
      }
    )
    .then((response) => {
      coinInfo[req.params.id] = response.data;
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
