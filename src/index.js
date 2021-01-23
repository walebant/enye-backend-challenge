const http = require('http');
const log = require('./config/logs');
const express = require('express');
const dotenv = require('dotenv');
const ratesRouter = require('./routes/ratesRouter');

dotenv.config();
const app = express();

const NAMESPACE = 'Server';

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Logging the request */
app.use((req, res, next) => {
  log.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP [${req.socket.remoteAddress}]`
  );

  res.on('finish', () => {
    log.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP [${req.socket.remoteAddress}], STATUS [${req.statusCode}]`
    );
  });

  next();
});

/** Rules of our API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET');
    return res.status(200).json({});
  }

  next();
});

/** App Routes */
app.use('/api/rates', ratesRouter);

/** Error handling */
app.use((_req, res) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);

const port = 4000;
httpServer.listen(port, () =>
  log.info(NAMESPACE, `Server is running at http://localhost:${port}`)
);
