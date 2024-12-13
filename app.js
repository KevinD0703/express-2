const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20050703',
    database: 'education_app'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

global.db = db;

const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

app.listen(port, () => {
    console.log(`Education app listening on port ${port}!`);
});
