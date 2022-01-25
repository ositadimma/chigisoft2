
//Load Models
const Drone = require('../models/drone');
const Medication= require('../models/medication')

const showHome= (req, res)=>{
    res.sendFile("../public/index.html")
}

const registerDrone= (req,res)=>{
    let errors=[]
    
    if(!req.body.serial_number || !req.body.model || !req.body.weight_limit || !req.body.battery_capacity || !req.body.state){
        errors.push({msg: 'All fields required'})
    }

    if(req.body.battery_capacity && req.body.state.toLowerCase()== 'loading'){
        res.json({msg: 'battery capacity not sufficient'})
    }

  
    if(req.body.model.toLowerCase() != 'lightweight' || req.body.model.toLowerCase() != 'middleweight' || req.body.model.toLowerCase() != 'cruiserweight' || req.body.model != 'heavyweight'){
        errors.push({msg: 'enter valid model'})
    }

    if(req.body.state.toUpperCase() != 'IDLE' || req.body.state.toUpperCase() != 'LOADED' || req.body.state.toUpperCase() != 'LOADING' || req.body.model.toUpperCase() != 'DELIVERING' || req.body.model.toUpperCase() != 'DELIVERED' || req.body.model.toUpperCase() != 'RETURNING'){
        errors.push({msg: 'enter valid state'})
    }


    if(req.body.weight_limit > 500){
        errors.push({msg: 'weight limit exceeded. max 500'})
    }
    if(req.body.battery_capacity > 100){
        errors.push({msg: 'enter valid number'})
    }

    if(errors.length>0){
        res.json(errors)
    }
    var initialDrone= {

    }

    //Register new drone
     const newDrone= new Drone({
        serial_number: req.body.serial_number,
        model: req.body.model,
        weight_limit: req.body.weight_limit,
        battery_capacity: req.body.battery_capacity,
        state: req.body.state
     })

     newDrone.save()
     res.status(200)
}

const checkAvailableDronesForLoading= (req, res)=>{
    

    Drone.find({'state': 'LOADING'}).then(drones=>{
        res.json(drones)
    })
}

const checkDroneBatteryLevel= (req, res)=>{
    
    if(!req.body.drone){
        errors.push({msg: 'All fields required'})
    }
    if(errors.length>0){
        res.json(errors);
    }

    Drone.findOne({'serial_number': req.body.drone}).then(drone=>{
        var battery_capacity= drone.battery_capacity
        res.json({'battery_capacity': battery_capacity})
    })
}

const checkDroneForAllMedication= (req, res)=>{
    
    if(!req.body.drone){
        errors.push({msg: 'All fields required'})
    }
    if(errors.length>0){
        res.json(errors);
    }

    Drone.findOne({'serial_number': req.body.drone}).then(drone=>{
        Medication.find({'drone': drone.serial_number}).then(medication=>{
            
            res.json(medication)
        })
    })
}   



module.exports={
    showHome,
    checkAvailableDronesForLoading,
    checkDroneBatteryLevel,
    checkDroneForAllMedication,
    registerDrone
}
