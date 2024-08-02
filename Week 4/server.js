const express = require('express');
const path = require('path');
const app = express();

// Route to serve 'newpage.html'
app.get('/newPage', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'newpage.html');
    console.log('Attempting to send file from:', filePath); // Log the file path for debugging

    // Send the HTML file as the response
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status || 500).end();
        } else {
            console.log('Sent:', filePath);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
