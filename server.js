const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const lightningRoutes = require('./routes/lightning');
const connectDB = require('./config/database');

const app = express();
const port = process.env.PORT || 3001;

// Connect to the database
connectDB();

// Database Configuration
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());



// Use the route files
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/lightning', lightningRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
