const { Schema, model } = require('mongoose');


const deviceSchema = new Schema({
  state: { type: String, required: true },
  level: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});




module.exports = model('Device',deviceSchema);