const {Router} = require('express');
const Device = require('../models/device');

const router = Router();

//Get All Devices
router.get('/', async (req, res) => {
    try {
      const devices = await Device.find({});
      res.send(devices);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });


 //Add a new device
router.post('/', async (req, res) => {
  try {
      const newDevice = new Device(req.body);
      const savedDevice = await newDevice.save();
      res.status(201).send(savedDevice);
  } catch (error) {
      console.error(error);
      res.status(400).send(error);
  }
});


// Update an existing device
router.put('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const updatedDevice = await Device.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      
      if (!updatedDevice) {
          return res.status(404).send({ message: 'Device not found' });
      }
      
      res.send(updatedDevice);
  } catch (error) {
      console.error(error);
      res.status(400).send(error);
  }
});

// Delete a device
router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const deletedDevice = await Device.findByIdAndDelete(id);
      
      if (!deletedDevice) {
          return res.status(404).send({ message: 'Device not found' });
      }
      
      res.send({ message: 'Device deleted successfully', device: deletedDevice });
  } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
});

  module.exports = router;