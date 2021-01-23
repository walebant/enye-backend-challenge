const axios = require('axios');

const ratesController = async (req, res) => {
  // query
  const { base, currency } = req.query;
  const currencyArray = currency.split(',');

  try {
    // fetch data
    const { data } = await axios.get(
      `https://api.exchangeratesapi.io/latest?base=${base}`
    );

    // filter data by requested currency
    const rates = Object.fromEntries(
      Object.entries(data.rates).filter(rate => currencyArray.includes(rate[0]))
    );

    // get date
    const date = new Date();
    const dateFormat = `${date.getFullYear()}-${
      date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate()}`;

    // return result
    return res.status(200).send({
      results: {
        base,
        date: dateFormat,
        rates,
      },
    });
  } catch (error) {
    const { response, message } = error;
    return res.status(response.status).send({
      message,
      statusText: response.statusText,
      status: response.status,
    });
  }
};

module.exports = ratesController;
