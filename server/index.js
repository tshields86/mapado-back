import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js';
import api from './api'; // all my routes live under a api folder
import MongoClient from 'mongodb';


let app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());


/* go connect to db first then setup all routes, check to see if we're on production or not. */
db.connect((process.env.MONGODB_URI || 'mongodb://localhost:27017/tacos'), (err) => {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    console.log('connected to mongo');
    /* now start the server and setup all routes! */

    //root route
    app.get('/', (req, res) => {
      res.json({
        'taco':'api',
        'version':'1.0'
      });
    });
    // api route
    app.use('/api', api());
    app.server.listen(process.env.PORT || 3000); // use the system port or local
    console.log(`Started on port ${app.server.address().port}`); // template string
  }
})

export default app;
