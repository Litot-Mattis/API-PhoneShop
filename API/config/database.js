const mongoose = require('mongoose');

// Set up default mongoose connection
const mongoDB = process.env.MONGO_URL || null;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Get the default connection
var db = mongoose.connection;

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));