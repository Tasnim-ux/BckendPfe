const user = require('../models/usermodel');

exports.test = (req, res) => {
  res.send("User controller is working.");
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getuserById = async (req, res) => {
  try {
    const id = req.params.id;
    const oneUser = await user.findById(id);
    res.status(200).json(oneUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.addmembre = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const role = "membre";
    const membre = new user({ username, email, password, role });
    const addeduser = await membre.save();
    res.status(200).json({ addeduser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’ajout du membre.', error: error.message });
  }
};

exports.addcoach = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newuser = new user({
      username,
      email,
      password,
      role: 'coach'
    });
    await newuser.save();
    res.status(201).json({ message: 'Coach ajouté avec succès !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’ajout du coach.' });
  }
};

exports.addadmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newuser = new user({
      username,
      email,
      password,
      role: 'admin'
    });
    await newuser.save();
    res.status(201).json({ message: 'Admin ajouté avec succès !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’ajout de l’admin.' });
  }
};

module.exports.DeleteuserById = async (req, res) => {
  try {
    const id = req.params.id;
    const checkIfUserExists = await user.findById(id);
    if (!checkIfUserExists) {
      throw new Error("User not Found !");
    }
    await user.findByIdAndDelete(id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};