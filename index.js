const express = require("express");
const axios = require("axios");
const { response } = require("express");
const app = express();

const limit = 1000;
const currency = "EUR";

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  axios
    .get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}&convert=${currency}&aux=platform`,
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
      res.send(response);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
