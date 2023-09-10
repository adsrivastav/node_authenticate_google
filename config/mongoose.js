// Import the mongoose library
const mongoose = require('mongoose');
const { encode } = require('querystring'); // Import the querystring module

// Encode the password
const password = '8957';
const encodedPassword = encode('8957', 'utf8'); // Replace 'Anil&2000' with your actual password

// Create the MongoDB connection URL with the encoded password
const dbURI = `mongodb+srv://adsrivastav179:${password}@cluster0.rmp45ij.mongodb.net/?retryWrites=true&w=majority`;

// Connect to the MongoDB server with the provided URL and options (none specified in this case)
mongoose.connect(dbURI, {
    // Options can be added here if needed
});

// Get a reference to the default Mongoose connection
const db = mongoose.connection;

// Listen for the 'error' event on the Mongoose connection
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// Listen for the 'open' event on the Mongoose connection
db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});

// Export the Mongoose connection object for use in other parts of the application
module.exports = db;