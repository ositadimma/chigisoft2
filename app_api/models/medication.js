const mongoose= require('mongoose')

const medicationSchema= new mongoose.Schema({
    name:{
        type: String
    },
    weight: {
        type: String,
        required: true
      },
    code: {
          type: String,
          required: true
      },
    imageUrl: {
          type: String,
          required: true
      },
    droneSerialNumber:{
        type: String,
        required: true
    }
      
})


const Medication =mongoose.model('Medication', medicationSchema)
module.exports= Medication