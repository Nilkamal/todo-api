const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');
const knex = require('knex');
const today = require('./controllers/today');
const upcoming = require('./controllers/upcoming');
const complete = require('./controllers/complete');
const todo = require('./controllers/todo');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
    // connection: {

    //   host : '127.0.0.1',
    //   user : 'postgres',
    //   password : '',
    //   database : 'todo'
    // }
  });
console.log(db);
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT;
  
app.get('/',todo.handleGetAll(db));
app.get('/GetCompleted', complete.handleGetCompleted(db))
app.get('/GetTodays', today.handleGetTodays(db));
app.get('/GetUpcomings', upcoming.handleGetUpcoming(db))
app.post('/insert', todo.insert(db));
app.put('/complete', complete.done(db));

app.listen(port, () => {
    console.log(`App now listen on port ${port}`)
})