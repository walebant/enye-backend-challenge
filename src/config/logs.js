const consola = require('consola');

const getTimeStamp = () => new Date().toDateString();

const success = message => {
  consola.success(`[${getTimeStamp()}] ${message}`);
};

const info = message => {
  consola.info(`[${getTimeStamp()}] ${message}`);
};

const error = message => {
  consola.error(`[${getTimeStamp()}] ${message}`);
};

module.exports = {
  success,
  info,
  error,
};
