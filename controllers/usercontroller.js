const fs = require('fs').promises;
const path = require('path');
const cleanupUploadedFile = async (file) => {
  if (!file) return;

  const filePath = path.join(__dirname, '../uploads', file.filename); // adapte si besoin

  try {
    await fs.unlink(filePath);
    console.log(`🗑️  Fichier supprimé : ${file.filename}`);
  } catch (err) {
    console.error(`❌ Erreur suppression fichier : ${file.filename}`, err.message);
  }
};

const User = require('../models/usermodel');
exports.test = (req, res) => {
  res.send("User controller is working.");
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.addmembre = async (req, res) => {
  try {
    const { username, email, password, age} = req.body;
    const role = "membre";
    const membre = new User({ username, email, password, role });
    const addedUser = await membre.save();
    res.status(200).json({ addedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’ajout du membre.', error: error.message });
  }
};


exports.addcoach = async (req, res) => {
  try {
    const { username, email, password, age} = req.body;
    const newUser = new User({
      username,
      email,
      password,
      age,
      role: 'coach'
    });
    await newUser.save();
    res.status(201).json({ message: 'Coach ajouté avec succès !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’ajout du coach.' });
  }
};

exports.addadmin = async (req, res) => {
  try {
    const { username, email, password, age} = req.body;
    const newUser = new User({
      username,
      email,
      password,
      role: 'admin'
    });
    await newUser.save();
    res.status(201).json({ message: 'Admin ajouté avec succès !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’ajout de l’admin.' });
  }
};
module.exports.DeleteUserById = async (req, res) => {
  try {
    //logique
    //const id = req.body
    const id = req.params.id;
    const checkIfUserExists = await User.findById(id);
    if (!checkIfUserExists) {
      throw new Error("User not Found !");
    }
    //const id = req.query
    await User.findByIdAndDelete(id);

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getOrderUsersByAge = async (req, res) => {
  try {
    //logique
    const UserList = await User.find().sort({ age: -1 }).limit(4);

    res.status(200).json({ UserList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.searchUsersByName = async (req, res) => {
  // ?name=John
  try {
    const { username } =  req.query;

    if (!username) {
      throw new Error("Please select a name");
    }

    const userList = await User.find({
      username: { $regex: username, $options: "i" }, // Debut
      //firstName: {$regex : `${name}$` , $options: "i" } Fin
    });

    if (userList.length === 0) {
      throw new Error("Aucune Utilisateur trouve pour ce nom");
    }

    res.status(200).json({ userList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.addmembreWithFile = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const userData = { ...req.body, role: "membre" };

    if (req.file) {
      userData.image_User = req.file.filename;
    }

    if (!userData.email || !userData.password) {
      if (req.file) await cleanupUploadedFile(req.file);
      return res.status(400).json({ message: "Email et password sont requis." });
    }

    const membre = new User(userData);
    const addedUser = await membre.save();
    return res.status(201).json(addedUser);
  } catch (error) {
    if (req.file) await cleanupUploadedFile(req.file);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    //logique
    const id = req.params.id;
    const { username, age } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(id, {
      $set: { username, age },
    });
    //const client = new userModel(req.body)
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
module.exports.updatePassword = async (req, res) => {
  try {
    //logique
    const id = req.params.id;
    const { password } = req.body;

    const salt = await bcrypt.genSalt();
    passwordHashed = await bcrypt.hash(password, salt);
    
    const updatedUser = await userModel.findByIdAndUpdate(id, {
      $set: { password : passwordHashed },
    });
    //const client = new userModel(req.body)
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

