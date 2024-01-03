const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 12),
    });
    const user = await newUser.save();
    req.session.user = { id: user._id, name: user.name, email: user.email };
    res.status(200).json({ status: true,user });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Internal server error ${error}`,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = { id: user._id, name: user.name, email: user.email };
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.status(200).json({ status: true, user });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Internal server error ${error}`,
    });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout successful" });
};

exports.protected = async(req,res) => {
    res.json({ message: 'Protected API accessed', user: req.session.user });
}