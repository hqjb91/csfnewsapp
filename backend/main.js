const express = require('express');
require('dotenv').config();
const cors = require('cors');

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

const app = express();

app.use(cors());

app.get('/news/:countryCode', (req, res) => {

    
});

app.use('*', (req, res) => {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`You have connected to port ${PORT} on ${new Date()}`);
})