const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    cuisine: String,
    name: String,
    city: String,
    restaurant_id: Number,
});

RestaurantSchema.static("getRestaurantByCuisine", function(value) {
    console.log(value)
    return this.find({cuisine: value})
})

const Restaruant = mongoose.model("Restaruant", RestaurantSchema);
module.exports = Restaruant;