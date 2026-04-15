const express = require('express');
require('dotenv').config();
const { addSchool, listSchools } = require('./src/controllers');

const app = express();
app.use(express.json());

// Routes
app.post('/addSchool', addSchool);
app.get('/listSchools', listSchools);

// Root path for testing
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>School Management API</title>
    <style>
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: #f6f8fa;
        color: #1f2328;
      }

      .container {
        max-width: 700px;
        margin: 80px auto;
        padding: 0 20px;
      }

      h1 {
        font-size: 28px;
        margin-bottom: 8px;
      }

      .status {
        font-size: 14px;
        color: #2da44e;
        margin-bottom: 30px;
      }

      .section-title {
        font-size: 14px;
        font-weight: 600;
        color: #57606a;
        margin-bottom: 10px;
      }

      .card {
        background: #ffffff;
        border: 1px solid #d0d7de;
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 10px;
        font-size: 14px;
      }

      .method {
        font-weight: 600;
        margin-right: 8px;
      }

      .get {
        color: #0969da;
      }

      .post {
        color: #8250df;
      }

      .links {
        margin-top: 25px;
        font-size: 14px;
      }

      .links a {
        display: block;
        margin-bottom: 8px;
        color: #0969da;
        text-decoration: none;
      }

      .links a:hover {
        text-decoration: underline;
      }

      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #6e7781;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>School Management API</h1>
      <div class="status">● API is running</div>

      <div class="section-title">Endpoints</div>

      <div class="card">
        <span class="method post">POST</span> /addSchool
      </div>

      <div class="card">
        <span class="method get">GET</span> /listSchools?latitude=xx&longitude=yy
      </div>

      <div class="links">
        <a href="/listSchools?latitude=17.4&longitude=78.5" target="_blank">
          Test List Schools
        </a>
        <a href="https://nbcreations01-1623692.postman.co/..." target="_blank">
          Open Postman Collection
        </a>
      </div>

      <div class="footer">
        Built by Bharadwaj · Node.js · Render
      </div>
    </div>
  </body>
  </html>
  `);
});

// Port configuration for local development
const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
