const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');
//bring in  user model
let Plan = require('../models/plan');

//get request /register form
router.get('/consultanta', function(req, res){
    res.render('consultanta');
});

router.post('/consultanta', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const nr = req.body.nr;
  const date = req.body.date;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('date', 'Date is required').notEmpty();
  
  let errors = req.validationErrors();

  if(errors){
    res.render('consultanta', {
      errors:errors,
      name:name
    });
  } 
  
  else {

    let newPlan = new Plan({
      name:name,
      email:email,
      nr:nr,
      date:date
    });

    newPlan.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registrated for a consultation');
            res.redirect('/');
          }
    });
     
    
  }//de la else
});

module.exports = router;