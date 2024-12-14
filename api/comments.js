const mongoose = require('mongoose');

const Comment = require('../models/Comment');

// MongoDB URI
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { name, comment } = req.body;

        // Create a new comment document
        const newComment = new Comment({
            name: name,
            comment: comment,
        });

        // Save the comment to MongoDB
        newComment.save()
            .then(() => {
                console.log('Comment saved to database');
                res.redirect('/');  // Redirect to the homepage after saving
            })
            .catch((err) => {
                console.error('Error saving comment', err);
                res.status(500).send('Server error');
            });
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
