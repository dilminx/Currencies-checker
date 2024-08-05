const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/getAllCurrencyNames", async (req, res) => {
  const fetchURL =
    "https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=46bfdb4be30746efa5ac3c3c55219ef4";
  try {
    const responce = await axios.get(fetchURL);
    const data = responce.data;

    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});
//convrt request
app.get("/getConvert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amount } = req.query;
  try {
    const fetchURL = `https://openexchangerates.org/api/historical/${date}.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=46bfdb4be30746efa5ac3c3c55219ef4`;
    const response = await axios.get(fetchURL);
    const datarates = response.data.rates;

    const soursrate = datarates[sourceCurrency];
    const targetrate = datarates[targetCurrency];
    const targetAmount = (targetrate / soursrate) * amount;

    return res.json(targetAmount.toFixed(2));
  } catch (error) {
    console.error(error);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
