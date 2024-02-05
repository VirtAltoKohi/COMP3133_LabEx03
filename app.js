const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://VirtAltoKohi:Cgifat$2462$@comp3133.bhrgzig.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const restaurantSchema = new mongoose.Schema({
  cuisines: String,
  name: String,
  city: String,
  restaurant_id: Number,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// REST API to return all restaurant details
app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// REST API to return all restaurant details by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  const cuisine = req.params.cuisine;
  try {
    const restaurants = await Restaurant.find({ cuisines: cuisine });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// REST API to return selected columns sorted by restaurant_id
app.get('/restaurants', async (req, res) => {
  const sortBy = req.query.sortBy || 'ASC';
  try {
    const sortOrder = sortBy === 'ASC' ? 1 : -1;
    const restaurants = await Restaurant.find()
      .select('id cuisines name city restaurant_id')
      .sort({ restaurant_id: sortOrder });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/restaurants/sortby=:order', async (req, res) => {
    const restaurants = await Restaurant.find();
    
      // Get the sort order from the route parameter (default to 'asc' if not provided)
    const sortOrder = req.params.order || 'asc';
  
    // Validate the sortOrder to prevent invalid inputs
    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
      return res.status(400).json({ error: 'Invalid sorting order. Use "asc" or "desc".' });
    }
  
    // Sort the restaurants based on restaurant_id
    const sortedRestaurants = sortOrder === 'asc'
      ? restaurants.slice().sort((a, b) => a.restaurant_Id - b.restaurant_Id)
      : restaurants.slice().sort((a, b) => b.restaurant_Id - a.restaurant_Id);
  
    // Send the sorted restaurants as a JSON response
    res.json(sortedRestaurants);
  });

// REST API to return restaurants details with specific criteria
app.get('/restaurants/:cuisine', async (req, res) => {
  const cuisine = req.params.cuisine;
  try {
    const restaurants = await Restaurant.find({
      cuisine: cuisine
    })
      .select('cuisine name')
      .sort({ name: 1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
