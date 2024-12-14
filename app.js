const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/');
});

// Handle form submission
app.post('/submit-message', (req, res) => {
    const name = req.body.name;
    const message = req.body.message;

    // Prepare the text to be written into the .txt file
    const commentData = `Name: ${name}\nMessage: ${message}\n--------------------------------------\n`;

    // Write the comment into the 'comments.txt' file
    fs.appendFile('comments.txt', commentData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Server error');
            return;
        }

    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
