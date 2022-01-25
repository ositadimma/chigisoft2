const express = require('express');
const router = express.Router();
const medication = require('../controllers/medication');
const drone = require('../controllers/drone');

//Register drone
router
  .route('/api/v1/newdrone')
  .post(drone.registerDrone) 

//load m,edication
router.post('/api/v1/loaddrone', medication.loadMedication)

//check drone for all medication
router.post('/api/v1//checkDrone', drone.checkDroneForAllMedication)

//check drone battery level
router.post('/api/v1//checkDroneBattery', drone.checkDroneBatteryLevel)

//check available drones for loading
router.get('/api/v1//checkAvailableDrones', drone.checkAvailableDronesForLoading)


module.exports = router;  