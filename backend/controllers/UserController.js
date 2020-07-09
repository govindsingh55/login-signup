const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

exports.validate = (method) => {
	switch (method) {
		case 'signup': {
			return [
				body('userName', `userName doesn't exists`).exists().isLength({min: 2}),
				body('email', 'Invalid email').exists().isEmail(),
				body('password').exists().isLength({min: 4, max: 10}),
			];
		}
		case 'login': {
			return [
				body('email', 'Invalid email').isEmail(),
				body('password').isLength({min: 4, max: 10}),
			];
		}
	}
};

exports.signup = (req, res, next) => {
  let errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  User.findOne({email: req.body.email})
    .exec()
    .then(result => {
      if(result) {
        return res.status(409).json({
          message: "User already exist",
          error: "User already exist"
        })
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: 'error while hashing',
            error: err
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            userName: req.body.userName
          });

          user.save()
          .then(result => {
            const token = jwt.sign(
              {
                email: user.email,
                userName:user.userName,
                userId: user._id,
              },
              "machinetest",
              {
                expiresIn: "24h"
              }
            );
            return res.status(201).json({
              message: 'signup successful',
              data: result,
              token 
            });
          })
          .catch(err => {
            return res.status(500).json({
              message: 'Something went wrong',
              error: err
            })
          })
        }
      })
    })
}

exports.login = (req, res, next) => {
  let errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  User.findOne({email: req.body.email})
    .exec()
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: "User does not exist.",
          error: "User does not exist."
        })
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: 'Auth failed',
            error: err
          });
        } else {
          const token = jwt.sign(
            {
              email: user.email,
              userName:user.userName,
              userId: user._id,
            },
            "machinetest",
            {
              expiresIn: "24h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            data: user,
            token: token,
          });
        }
      })
    })
};
