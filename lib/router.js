'use strict';
const express = require('express');
const bodyParser = require('body-parser');
//connect to mongoose and open a connection to the test database on local MongoDB

const Employee = require('../model/Employee');
const router = express.Router();

router.use(bodyParser.json());

//POST
router.post('/', (req, res, next) => {

  var postedEmployee = req.body;
  console.log(postedEmployee);

  if (!Object.keys(postedEmployee).length) return res.end();

  if (postedEmployee.manager){
    var newEmployee = new Employee({
      name: postedEmployee.name,
      username: postedEmployee.username,
      DOB: new Date(postedEmployee.DOB),
      email: postedEmployee.email,
      address: postedEmployee.address,
      phone: postedEmployee.phone,
      position: postedEmployee.position,
      manager: postedEmployee.manager
    });
  } else {
    var newEmployee = new Employee({
      name: postedEmployee.name,
      username: postedEmployee.username,
      DOB: new Date(postedEmployee.DOB),
      email: postedEmployee.email,
      address: postedEmployee.address,
      phone: postedEmployee.phone,
      position: postedEmployee.position
    });
  }

  newEmployee.save((err, savedEmployee) => {
    if (err) {
      console.error(err);
      return res.sendStatus(400);
    }
    res.send(savedEmployee);
  })
  // Employee.findOneAndUpdate(newEmployee.username, newEmployee,{upsert: true, 'new': true}, (docOrErr) => {
  //   console.log(docOrErr);
  //   res.send(docOrErr);
  // });

});

//General GET
router.get('/', (req, res, next) => {

  Employee.find({}, (err, employees) => {
    if (err) {
      console.error(err);
      res.end();
    }
    res.send(employees);
  });

});

//Specific get
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Employee.findById(id, (err, employee) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.send(employee);
  });
});

//PUT
router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  var update = req.body;
  update.DOB = new Date(update.DOB);

  Employee.findByIdAndUpdate(id, update, {bypassDocumentValidation: false, multi: false}, (err, numAffected) => {
    if (err) return console.error(err);

    Employee.findById(req.params.id, (err, employee) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.send(employee);
    });

  });
});

//DELETE
router.delete('/:id', (req, res, next) => {
  Employee.where().findOneAndRemove({'_id': req.params.id}, {}, (err, removedEmployee) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.send(removedEmployee);
  });
});
module.exports = router;


