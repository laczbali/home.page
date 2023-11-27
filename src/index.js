import express from 'express';
import path from 'path';
import { renderTemplate } from './utils/Templater.js';
import https from 'https';
import http from 'http';
import fs from 'fs';

const CWD = path.join(path.resolve(), 'src');
const PORT = process.env.PORT || 80;
const PORT_SSL = process.env.PORT_SSL || 443;
const OPTIONS = {
  // key: fs.readFileSync("/some/path/my-site-key.pem"),
  // cert: fs.readFileSync("/some/path/chain.pem")
};

const app = express()

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

// start app on specified ports
http.createServer(app).listen(PORT, () => console.log(`server is running - http://127.0.0.1`));
https.createServer(OPTIONS, app).listen(PORT_SSL, () => console.log(`server is running - https:///127.0.0.1`));
