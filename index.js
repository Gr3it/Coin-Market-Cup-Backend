const express = require("express");
const axios = require("axios");
const { response } = require("express");
const app = express();

const limit = 1000;
const currency = "EUR";

let data; //Only development (remove api spam) remove in production

app.get("/listings/latest", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (data) res.send(data); //Only development (remove api spam) remove in production
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
      data = response.data;
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/info/:id", (req, res) => {
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
