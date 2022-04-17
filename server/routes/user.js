const express = require('express')
const API = require('../controllrs/api')

const router = express.Router();

//create user
router.post('/user', API.createUser)
router.get('/user', API.getAllUsers)
router.get('/user/:id', API.getUser)
router.put('/user/:id', API.putUser)
router.delete('/user/:id', API.deleteUser)




module.exports = router;