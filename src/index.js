import express from 'express';
import path from 'path';
import { renderTemplate } from './utils/Templater.js';

const CWD = path.join(path.resolve(), 'src');
const PORT = process.env.PORT || 8080;

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

// start app on specified port
app.listen(PORT, () => console.log(`server is running - http://127.0.0.1`));
