var User = require('../models/user.js');
var bcrypt = require("bcrypt");
var { createError } = require('../utils/error.js');
var jwt = require("jsonwebtoken");
require("dotenv").config();

const supersecret = process.env.SUPER_SECRET;


exports.register = async (req, res, next) => {
  try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
          ...req.body,
          password: hash,
      });

      await newUser.save();
      res.status(200).send("User has been created.");
  } catch (err) {
      next(err);
  }
};


exports.login = async (req, res, next) => {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (!user) {
        return next(createError(404, "User not found!"));
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
  
      if (!isPasswordCorrect) {
        return next(createError(400, "Wrong password or name!"));
      }
  
      const token = jwt.sign({ user_id: user._id }, supersecret);
  
      res.send({ message: "Login successful, here is your token", token });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };
