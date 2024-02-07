const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRoutes.js');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://admin:KNZJwkdoAfSrpiA2@comp3133.bhrgzig.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(success => {
    console.log(`MongoDB connected ${success}`)
}).catch(err => {
    console.log(`Error while MongoDB connection ${err}`)
});

app.use(restaurantRouter);

app.listen(3000, () => { console.log(`Server is running...`) });