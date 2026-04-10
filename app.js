const express = require('express');
require('dotenv').config();
const { addSchool, listSchools } = require('./src/controllers');

const app = express();
app.use(express.json());

// Routes
app.post('/addSchool', addSchool);
app.get('/listSchools', listSchools);

// Root path for testing
app.get('/', (req, res) => {
    res.json({ message: "School Management API is running" });
});

// Port configuration for local development
const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
