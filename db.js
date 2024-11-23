const mysql = require('mysql2');

// Create a connection pool to your MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: 'admin357159', // your MySQL password
  database: 'contacts' // your database name
});

module.exports = pool.promise(); // use promise-based queries