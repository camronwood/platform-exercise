const fs = require('fs');
const https = require('https');
const app = require('./server');

const PORT = 80;
const HOST = '0.0.0.0';

// Start the server
https.createServer({
  key: fs.readFileSync('./keys/key.pem'),
  cert: fs.readFileSync('./keys/cert.pem'),
},
app).listen(PORT, HOST, () => {
  // eslint-disable-next-line
  console.log(`Running on https://${HOST}:${PORT}`);
});
