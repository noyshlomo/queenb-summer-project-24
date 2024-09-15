const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
<<<<<<< HEAD
<<<<<<< HEAD
const usersRoutes = require('./routes/user')
const recipesRouter = require ('./routes/recipesRouter')
=======
const recipeRouter = require ('./routes/recipeRouter')
>>>>>>> e7edea3 (Fixes + navbar component + app.js + server .js.)
//const rubberDucksRoutes = require('./routes/rubberDucks')
=======

const recipeRouter = require ('./routes/recipeRouter')
const usersRoutes = require('./routes/user')


>>>>>>> af3cad6a5586370ace36b214601df4560e6f9630
dotenv.config();

// Constants
const PORT = process.env.PORT;

// Create Express server
const app = express();

// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
<<<<<<< HEAD
<<<<<<< HEAD
=======
app.use('/api/recipe', recipeRouter)
>>>>>>> af3cad6a5586370ace36b214601df4560e6f9630
app.use('/api/user', usersRoutes)
app.use('/api/recipes', recipesRouter)
=======
app.use('/api/recipe', recipeRouter)
>>>>>>> e7edea3 (Fixes + navbar component + app.js + server .js.)


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to mongoDB & listening on port', process.env.PORT)
    })
  }).catch((err) => {
    console.log(err)
  });




