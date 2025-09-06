const programmesemaine = require('../models/programmesemaine');

// 🔹 Créer un programme (activité)
module.exports.createprogramme = async (req, res) => {
  try {
    const { jour, activité, coach, heureDebut, heureFin } = req.body;

    const newprogramme = new programmesemaine({
      jour,
      activité,
      coach,
      heureDebut,
      heureFin
    });

    const savedprogramme = await newprogramme.save();
    res.status(201).json(savedprogramme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Consulter les programmes d'un coach
module.exports.consulterProgrammeCoach = async (req, res) => {
  try {
    const { coachId } = req.params;
    const { jour } = req.query; // Optionnel : /?jour=mardi

    const filtre = { coach: coachId };
    if (jour) {
      filtre.jour = jour.toLowerCase();
    }

    const programmes = await programmesemaine.find(filtre).sort({
      jour: 1,
      heureDebut: 1
    });

    if (!programmes.length) {
      return res.status(404).json({ message: 'Aucune activité trouvée pour ce coach.' });
    }

    res.status(200).json(programmes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la consultation.', error: error.message });
  }
};
