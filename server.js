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

app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { PersonName, Mobile, Email, url } = req.body;

  // Start with the base SQL query for updating the record
  let updateQuery = 'UPDATE Contacts SET ';
  const updateValues = [];

  // Conditionally add each field to the update query if it's provided in the request body
  if (PersonName) {
    updateQuery += 'PersonName = ?, ';
    updateValues.push(PersonName);
  }
  if (Mobile) {
    updateQuery += 'Mobile = ?, ';
    updateValues.push(Mobile);
  }
  if (Email) {
    updateQuery += 'email = ?, ';
    updateValues.push(Email);
  }
  if (url) {
    updateQuery += 'url = ?, ';
    updateValues.push(url);
  }

  // If no fields were provided, respond with a 400 error (Bad Request)
  if (updateValues.length === 0) {
    return res.status(400).json({ error: 'At least one field must be provided to update.' });
  }

  // Remove the trailing comma and space
  updateQuery = updateQuery.slice(0, -2); // remove the last comma and space
  updateQuery += ' WHERE id = ?';
  updateValues.push(id);

  try {
    // Execute the update query with the values
    const [result] = await db.execute(updateQuery, updateValues);

    // If no rows were affected, the contact wasn't found
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the updated contact in the response
    res.status(200).json({
      id,
      PersonName,
      Mobile,
      Email,
      url
    });
  } catch (error) {
    // Handle any errors that occur during the update
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
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
