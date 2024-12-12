const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/add-log', (req, res) => {
    res.render('add-log');
});

router.post('/add-log', (req, res) => {
    const { title, content } = req.body;
    const query = 'INSERT INTO logs (title, content) VALUES (?, ?)';
    db.query(query, [title, content], (err) => {
        if (err) {
            console.error('Error adding log:', err);
            return res.status(500).send('Database error');
        }
        res.redirect('/logs');
    });
});

router.get('/logs', (req, res) => {
    const query = 'SELECT * FROM logs';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching logs:', err);
            return res.status(500).send('Database error');
        }
        res.render('logs', { logs: results });
    });
});

module.exports = router;
