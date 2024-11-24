const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import MySQL connection
const cors = require('cors')
const app = express();
const port = 3000;
app.use(cors())

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// --- CRUD Operations ---

// 1. Create a new record (POST)
app.post('/contacts', async (req, res) => {
  const { PersonName, Mobile, Email, url } = req.body;
  try {
    const [rows] = await db.execute('INSERT INTO Contacts (PersonName, Mobile, Email, url) VALUES (?, ?, ?, ?)', [PersonName, Mobile, Email, url]);
    res.status(201).json({ id: rows.insertId, name, email });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// 2. Read all records (GET)
app.get('/contacts', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Contacts');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// 3. Read a single record by ID (GET)
app.get('/contacts/:personName', async (req, res) => {
  const { personName } = req.params; // Descriptive name for the route parameter
  try {
    const [rows] = await db.execute('SELECT * FROM Contacts WHERE PersonName = ?', [personName]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

app.put('/contacts/:personName', async (req, res) => {
  const { personName } = req.params;
  const { PersonName, Mobile, Email, url } = req.body;
  try {
    const [result] = await db.execute(
      'UPDATE Contacts SET PersonName = ?, Email = ?, Mobile = ?, url = ? WHERE PersonName = ?',
      [PersonName, Mobile, Email, url, personName]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'User updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Delete a record (DELETE)
app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM Contacts WHERE PersonID = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
