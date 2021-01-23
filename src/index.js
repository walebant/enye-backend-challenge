const http = require('http');
const log = require('./config/logs');
const express = require('express');
const ratesRouter = require('./routes/ratesRouter');

const app = express();

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Logging the request */
app.use((req, res, next) => {
  log.info(`
    METHOD - [${req.method}] 
    URL - [${req.url}]
    `);

  res.on('finish', () => {
    log.success(`
    METHOD - [${req.method}]
    URL - [${req.originalUrl}]
    STATUS - [${res.statusCode}]`);
  });

  req.on('error', () => {
    log.error(`
    METHOD - [${req.method}]
    URL - [${req.originalUrl}]
    STATUS - [${req.statusCode}]`);
  });

  next();
});

/** App Routes */
app.use('/api/rates', ratesRouter);

/** Error handling */
app.use((req, res) => {
  const error = new Error('Error completing request.');
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Method not allowed',
      method: req.method,
      status: 405,
    });
  }
  return res.status(500).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);

const port = 4000;
httpServer.listen(port, () =>
  log.success(`Server is running at http://localhost:${port}`)
);
