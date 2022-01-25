const mongoose = require('mongoose');
const Drone = require('../models/drone');
const Medication= require('../models/medication');


//Register and load new medication


const loadMedication= (req, res)=>{
    let errors=[]
    if(!req.body.name || !req.body.weight || !req.body.code || !req.body.imageUrl || !req.body.drone){
        errors.push({msg: 'All fields required'})
    }
    if(!req.body.name.match(/[^A-Za-z0-9\\_-]+/)){
        errors.push({msg: 'enter valid name'})
    }
    if(!req.body.code.match(/?:_[^A-Z0-9]+/)){
        errors.push({msg: 'enter valid code'})
    }
    if(errors.length>0){
        res.json(errors)
    }

    Drone.findOne({'serial_number': req.body.drone}).then(drone=>{
        if(req.body.weight>drone.weight_limit){
            res.send({msg: 'weight limit for drone exceeded'})
        }
    })

  

    //Register new drone
     const newMedication= new Medication({
        name: req.body.name,
        weight: req.body.weight,
        code: req.body.code,
        imageUrl: req.body.imageUrl,
        drone: req.body.drone
     })

     newMedication.save()
}



module.exports = {
  loadMedication
};
