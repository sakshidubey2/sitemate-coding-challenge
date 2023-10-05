const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const admin = require('firebase-admin');

const serviceAccount = require('./service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
app.use(bodyParser.json());
const routes = require('./routes');
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
