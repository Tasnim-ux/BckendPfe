const Abonnement = require('../models/abonnement');
const User = require('../models/usermodel');

// ✅ Créer un abonnement (générique)
module.exports.createAbonnement = async (req, res) => {
  try {
    const { membreId, type, prix, dateDebut, dateFin } = req.body;

    const newAbo = new Abonnement({
      membre: membreId,
      type,
      prix,
      dateDebut: new Date(dateDebut),
      dateFin: new Date(dateFin),
    });

    const savedAbo = await newAbo.save();
    res.status(201).json(savedAbo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Choisir un abonnement pour un membre
module.exports.choisirAbonnement = async (req, res) => {
  try {
    const { membreId, abonnementId } = req.body;

    const membre = await User.findById(membreId);
    if (!membre) {
      return res.status(404).json({ message: 'Membre non trouvé.' });
    }

    if (membre.role !== 'membre') {
      return res.status(403).json({ message: 'Seuls les membres peuvent choisir un abonnement.' });
    }

    const abonnement = await Abonnement.findById(abonnementId);
    if (!abonnement) {
      return res.status(404).json({ message: 'Abonnement non trouvé.' });
    }

    membre.abonnement = abonnement._id;
    await membre.save();

    res.status(200).json({
      message: 'Abonnement choisi avec succès.',
      abonnementChoisi: abonnement
    });

  } catch (error) {
    console.error('Erreur choisirAbonnement:', error);
    res.status(500).json({ message: 'Erreur lors du choix de l’abonnement.', details: error.message });
  }
};

// ✅ Créer et assigner un abonnement à un membre (admin)
module.exports.ajouterAbonnementPourMembre = async (req, res) => {
  try {
    const { membreId, type, prix, dateDebut, dateFin } = req.body;

    const membre = await User.findById(membreId);
    if (!membre) {
      return res.status(404).json({ message: "Membre non trouvé." });
    }

    if (membre.role !== 'membre') {
      return res.status(400).json({ message: "Ce compte n'est pas un membre." });
    }

    const newAbo = new Abonnement({
      membre: membreId,
      type,
      prix,
      dateDebut: new Date(dateDebut),
      dateFin: new Date(dateFin),
    });

    const savedAbo = await newAbo.save();

    membre.abonnement = savedAbo._id;
    await membre.save();

    res.status(201).json({
      message: "Abonnement créé et assigné avec succès.",
      abonnement: savedAbo
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de l’abonnement au membre.", error: error.message });
  }
};

// ✅ Modifier un abonnement (admin)
module.exports.updateAbonnement = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Abonnement.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Abonnement non trouvé." });
    }

    res.status(200).json({
      message: "Abonnement mis à jour avec succès.",
      abonnement: updated
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour.", error: error.message });
  }
};

// ✅ Supprimer un abonnement (admin)
module.exports.deleteAbonnement = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Abonnement.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Abonnement non trouvé." });
    }

    res.status(200).json({ message: "Abonnement supprimé avec succès." });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression.", error: error.message });
  }
};

// ✅ Lister tous les abonnements (admin)
module.exports.getAllAbonnements = async (req, res) => {
  try {
    const abonnements = await Abonnement.find().populate('membre', 'username email role');
    res.status(200).json(abonnements);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des abonnements.", error: error.message });
  }
};