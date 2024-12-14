const mongoose = require('mongoose');
const Comment = require('../models/Comment');

// MongoDB URI
const mongoURI = process.env.MONGODB_URI;

// Avoid reconnecting on every function call
let isConnected = false;

const connectToDatabase = async () => {
    if (!isConnected) {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Connected to MongoDB');
    }
};

// Export the serverless function
module.exports = async (req, res) => {
    try {
        // Ensure database connection
        await connectToDatabase();

        if (req.method === 'POST') {
            const { name, comment } = req.body;

            const newComment = new Comment({
                name: name,
                comment: comment,
            });

            // Save to MongoDB
            await newComment.save();

            console.log('Comment saved to database');
            // Redirect after saving
            res.writeHead(302, { Location: '/' });
            res.end();
        } else {
            res.status(405).send('Method Not Allowed');
        }
    } catch (err) {
        console.error('Error in function', err);
        res.status(500).send('Internal Server Error');
    }
};
