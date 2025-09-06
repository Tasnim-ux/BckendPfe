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
    const membre = new User({ username, email, password, role, age});
    const addedUser = await membre.save();
    res.status(200).json({ addedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’ajout du membre.', error: error.message });
  }
};


exports.addcoach = async (req, res) => {
  try {
    const { username, email, password, age } = req.body;
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
    const { username, email, password, age } = req.body;
    const newUser = new User({
      username,
      email,
      password,
      age,
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
    const userData = { ...req.body };

    if (req.file) {
      const { filename } = req.file;
      userData.image_User = filename;
      userData.role = "membre";
    }

    // (optionnel) validation business avant sauvegarde DB
    // si tu détectes un conflit, pense à nettoyer puis répondre
    // if (await userModel.exists({ email: userData.email })) {
    //   await cleanupUploadedFile(req.file);
    //   return res.status(409).json({ message: 'Email déjà utilisé' });
    // }

    const membre = new User(userData);
    const addedUser = await membre.save();
    return res.status(201).json(addedUser);
  } catch (error) {
    // IMPORTANT : nettoyer le fichier si uploadé
    await cleanupUploadedFile(req.file);
    return res.status(500).json({ message: error.message });
  }
};
