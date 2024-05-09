const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.use(cors({
//     origin: 'http://localhost:3000/signup', // Specify allowed origin(s)
//     methods: ['GET', 'POST'], // Specify allowed HTTP methods
//     allowedHeaders: ['Content-Type'], // Specify allowed headers
//     credentials: true // Enable CORS credentials (cookies, authorization headers)
// }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cgayatri@indiratrade.com', 
        pass: 'Gayatr@15' 
    },
    secure: false, 
    tls: {
        rejectUnauthorized: false
    }
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gayatri@123",
    database: "signup",
    // authPlugins: {
    //     mysql_clear_password: () => () => Buffer.from('')
    // }
});

// db.connect(function(err) {
//     if (err) {
//         console.error('Error connecting to MySQL database: ' + err.stack);
//         return;
//     }
//     console.log('Connected to MySQL database as id ' + db.threadId);
// });

// app.get('/', (req, res) => {
//     res.send('Welcome to the homepage');
// });

app.get('/', (req, res) => {
    res.redirect('./signup');
});

app.use(express.static(path.join(__dirname, 'client', 'public')));

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

app.post('/signup', (req, res) => {
    const { name, email, phone, password } = req.body;
    const sql = "INSERT INTO login (name, email, phone, password) VALUES (?, ?, ?, ?)";
    const values = [name, email, phone, password];
    console.log("SQL Query:", sql, values);
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting into database:", err);
            return res.status(500).json({ error: "Error inserting into database" });
        }
        console.log("Inserted into database:", result);
        return res.json({ success: true });
    });
});

app.post('/login', (req, res) => {
    console.log("Request body:", req.body);
    const { email, password } = req.body;
    const sql = "SELECT * FROM login WHERE `email` = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error("Error occurred:", err);
            return res.status(500).json({ error: "An error occurred while logging in." });
        }
        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        } else {
            const user = data[0];
            
            if (user.password !== password) {
                return res.status(401).json({ success: false, message: "Invalid email or password." });
            }
            return res.json({ success: true, message: "Login successful." });
        }
    });
});

app.post('/date', (req, res) => {
    const { startDate, endDate } = req.body;

    console.log('Date Data:', { startDate, endDate });
    
    res.json({ success: true, message: 'Date data submitted successfully' });
});

app.post('/apply-leave', (req, res) => {
    const { name, email, startDate, endDate } = req.body;

    const sql = "INSERT INTO leave_requests (name, email, leaveStartDate, leaveEndDate, status) VALUES (?, ?, ?, ?, 'pending')";
    const values = [name, email, startDate, endDate];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting leave request into database:", err);
            return res.status(500).json({ success: false, message: "Error submitting leave request." });
        }
        
        const mailOptions = {
            from: 'cgayatri@indiratrade.com',
            to: 'gayatrichhabile1511@gmail.com',
            subject: 'Leave Request',
            text: `Leave request submitted by ${name}. Start Date: ${leaveStartDate}, End Date: ${leaveEndDate}.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ success: false, message: 'Error sending email notification.' });
            } else {
                console.log('Email sent:', info.response);
                return res.json({ success: true, message: 'Leave request submitted successfully.' });
            }
        });
    });
});

const PORT = 4004;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

module.exports = db;