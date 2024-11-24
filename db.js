const mysql = require('mysql2');

// Create a connection pool to your MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: '', // your MySQL username
  password: '', // your MySQL password
  database: 'contacts' // your database name
});

module.exports = pool.promise(); // use promise-based queries