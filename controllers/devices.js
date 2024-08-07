const mongoose = require('mongoose');
const Device = require('./models/device');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Create a new device
  const newDevice = new Device({
    State: 'active',
    Level: 10,
    Latitude: 40.7128,
    Longitude: -74.0060
  });

  // Save the device to the collection
  try {
    const savedDevice = await newDevice.save();
    console.log('Device inserted successfully with ID:', savedDevice._id);
  } catch (err) {
    console.error('Error inserting device:', err);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
});
