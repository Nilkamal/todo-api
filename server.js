const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const today = require('./controllers/today');
const upcoming = require('./controllers/upcoming');
const complete = require('./controllers/complete');
const todo = require('./controllers/todo');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL || "postgres://tiegtljizdjbtr:916eec6c6618c919233de3386ae2d5eed62d9a89771c8b5e0a5b1e10c1548c03@ec2-54-243-128-95.compute-1.amazonaws.com:5432/d61tk6c5ae4tr5",
        ssl: true
    }
    // connection: {

    //   host : '127.0.0.1',
    //   user : 'postgres',
    //   password : '',
    //   database : 'todo'
    // }
  });
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