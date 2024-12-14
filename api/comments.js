const fs = require('fs');
const bodyParser = require('body-parser');

module.exports = (req, res) => {
    if (req.method === 'POST') {
        // Parse the body of the POST request
        const { name, comment } = req.body;

        // Format the comment
        const commentData = `Name: ${name}\nComment: ${comment}\n--------------------------------------\n`;

        // Write to comments.txt (Note: Vercel does not persist the filesystem, so consider using a cloud database or storage solution)
        fs.appendFile('comments.txt', commentData, (err) => {
            if (err) {
                console.error('Error writing to file', err);
                res.status(500).send('Server error');
                return;
            }
            console.log('Comment added!');
            res.redirect('/');
        });
    } else {
        // If not a POST request, return an error
        res.status(405).send('Method Not Allowed');
    }
};
