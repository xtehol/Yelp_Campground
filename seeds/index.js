const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected")
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fd98d4e1ebb0f025cba16f9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: 'https://source.unsplash.com/collection/483251/in-the-woods',
            images: [
                {
                    url: 'https://res.cloudinary.com/djfqqgm2a/image/upload/v1609217138/YelpCamp/dozgxxjtnkdrlku0eddk.jpg',
                    filename: 'YelpCamp/dozgxxjtnkdrlku0eddk'
                },
                {
                    url: 'https://res.cloudinary.com/djfqqgm2a/image/upload/v1609217138/YelpCamp/xkkjpolcrno2wn0qidxd.jpg',
                    filename: 'YelpCamp/xkkjpolcrno2wn0qidxd'
                },
                {
                    url: 'https://res.cloudinary.com/djfqqgm2a/image/upload/v1609217138/YelpCamp/jnxsjlbkq4ztieetzvhg.jpg',
                    filename: 'YelpCamp/jnxsjlbkq4ztieetzvhg'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius veniam harum ad dolores aliquam asperiores nemo! Obcaecati vero aut veniam perferendis suscipit pariatur qui adipisci voluptatibus, nostrum officiis possimus rerum.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})