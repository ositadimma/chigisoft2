const mongoose= require('mongoose')

const droneSchema= new mongoose.Schema({
    serial_number: {
        type: Number,
        unique: true,
        required: true,
      },
      model:{
        type: String,
        required: true
      },
      weight_limit: {
          type: Number,
          required: true
      },
      battery_capacity:{
            type: Number
      },
      state:{
          type: String,
          required: true
      }
})



const Drone =mongoose.model('Drone', droneSchema)
module.exports= Drone


// - serial number (100 characters max);
// - model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
// - weight limit (500gr max);
// - battery capacity (percentage);
// - state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).