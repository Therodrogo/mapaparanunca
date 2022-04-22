const express = require('express')
const API = require('../controllrs/apiEdificio')
const router = express.Router();

//create user
router.post('/Edificio', API.createEdificio)
router.get('/Edificio', API.getAllEdificios)
router.get('/Edificio/:id', API.getEdificio)
router.put('/Edificio/:id', API.putEdificio)
router.delete('/Edificio/:id', API.deleteEdificio)




module.exports = router;