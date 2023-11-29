import express from 'express';
import path from 'path';
import https from 'https';
import fs from 'fs';
import tls from 'tls';
import { renderTemplate } from './utils/Templater.js';

const CWD = path.join(path.resolve(), 'src');

const PORT_SSL = process.env.PORT_SSL || 443;

const SSL_KEY_FULLPATH = process.env.SSL_KEY_FULLPATH;
const SSL_CERT_FULLPATH = process.env.SSL_CERT_FULLPATH;
if(!SSL_KEY_FULLPATH || !SSL_CERT_FULLPATH) {
  throw new Error('SSL_KEY_FULLPATH and SSL_CERT_FULLPATH must be set');
}

// basic setup
const app = express()
const httpOptions = {
  SNICallback: (domain, cb) => {
    console.log('domain', domain);

    var cert = {
      key: fs.readFileSync(SSL_KEY_FULLPATH),
      cert: fs.readFileSync(SSL_CERT_FULLPATH)
    }

    var ctx = tls.createSecureContext(cert);
    return cb(null, ctx);
  }
};

// serve homepage
app.get('/', function (req, res) {
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().split(' ')[0];

  res.header('Cache-Controrl', 'no-store');
  res.send(
    renderTemplate(
      path.join(CWD, 'pages', 'index.html'),
      {
        currentDateTime: `${currentDate} ${currentTime}`,
      }
    )
  );
})

// middleware - serve static files
app.use('/static', express.static(path.join(CWD, 'static'), {
  extensions: ['html'],
  index: false,
}));

// start app on specified port
https.createServer(httpOptions, app).listen(PORT_SSL, () => console.log(`server is running - ${new Date().toISOString()}`));
