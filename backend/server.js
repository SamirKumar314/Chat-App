const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat_app'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
})

let incognitoMode = false;

// Toggle incognito mode
app.post('/toggle-incognito', (req, res) => {
    incognitoMode = !incognitoMode;
    res.json({ incognito: incognitoMode });
});

//API: Get messages and incognito
app.get('/messages', (req, res) => {
    db.query('SELECT * FROM messages ORDER BY timestamps ASC', (err, result) => {
        if (err) throw err;

        if (incognitoMode) {
            result = result.map(msg => {
                if (msg.sender === "Myself") {
                    return { ...msg, sender: "Anonymous"}
                }
                return msg
            })
        }
        res.json(result);
    })
})

//API: Send messages
app.post('/messages', (req, res) => {
    const { sender, message } = req.body;
    db.query('INSERT INTO messages (sender, message) VALUES (?, ?)', [sender, message], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, sender, message});
    })
})

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
    
})