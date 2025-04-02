
const express = require('express')
const router = express.Router()
const employeeController = require("../controllers/employeeController")
const Employee = require("../models/Employee")


const { createEmployee, getEmployees, singleEmployee, updateEmployee, getUserLearnings } = require('../controllers/employeeController'); 

// get, post, put/putch, delete

router.post('/add-emp', employeeController.createEmployee)
router.get('/allemployees', employeeController.getEmployees)
router.get('/emplyee/:id', employeeController.singleEmployee)
router.get('/:id/learnings/:dateAdd',employeeController.getUserLearnings)
router.put('/employees/:id', employeeController.updateEmployee)  
router.delete('/delete/:id', employeeController.deleteEmployee)

module.exports = router  