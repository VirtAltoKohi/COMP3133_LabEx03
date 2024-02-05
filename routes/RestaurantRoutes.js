const express = require('express');
const restaurantModel = require('../models/Restaurant.js');
const app = express();

app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({});
        res.status(200).send(restaurants);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

//Add NEW Book
app.post("/restaurants", async (req, res) => {
  console.log(req.body)
  try {
      const newRestaurant = new restaurantModel({
          ...req.body
      })
      await newRestaurant.save()
      res.status(200).send(newRestaurant)
  } catch(error) {
      res.status(500).send(error)
  }
  
  // res.send({message: "Add NEW Book"})
})

app.get('/restaurants/cuisine/:name', async (req, res) => {
    const name = req.params.name;

    const restaruant = await restaurantModel.getRestaurantByCuisine(name);
    console.log(restaruant)
    try {
        if(restaruant) {
            res.send(restaruant);
        }else{
            res.send(JSON.stringify({status:false, message: "no data found"}))
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/restaurants/sortby=:order', async (req, res) => {
  const restaurants = await restaurantModel.find({});
  
    // Get the sort order from the route parameter (default to 'asc' if not provided)
  const sortOrder = req.params.order || 'asc';

  // Validate the sortOrder to prevent invalid inputs
  if (sortOrder !== 'asc' && sortOrder !== 'desc') {
    return res.status(400).json({ error: 'Invalid sorting order. Use "asc" or "desc".' });
  }

  // Sort the restaurants based on restaurant_id
  const sortedRestaurants = sortOrder === 'asc'
    ? restaurants.slice().sort((a, b) => a.restaurant_id - b.restaurant_id)
    : restaurants.slice().sort((a, b) => b.restaurant_id - a.restaurant_id);

  // Send the sorted restaurants as a JSON response
  res.json(sortedRestaurants);
});

app.get('/restaurants/:name', async (req, res) => {
    try {
        const restaurant = await restaurantModel.find({ name: req.params.name }).select("cuisine name city");
        console.log(req.params.name);
        res.send(restaurant);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;