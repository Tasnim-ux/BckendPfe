const express = require('express');
const router = express.Router();

// Route: GET /users
router.get('/', (req, res) => {
  console.log('Route GET /users appelée'); // <-- ajouté pour debug
  res.json({ message: 'Users root route working!' });
});

// Route: GET /users/Tasnim
router.get('/Tasnim', (req, res) => {
  res.json({ message: 'respond with a resource at /users/Tasnim' });
});

module.exports = router;