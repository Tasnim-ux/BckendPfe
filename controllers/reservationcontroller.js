const Reservation = require('../models/reservation');
const User = require('../models/usermodel');
const ProgrammeSemaine = require('../models/programmesemaine');

// 📌 Créer une réservation
module.exports.createreservation = async (req, res) => {
  try {
    const { membre, programme } = req.body;

    if (!membre || !programme) {
      return res.status(400).json({ message: 'Le membre et le programme sont requis.' });
    }

    const userData = await User.findById(membre);
    if (!userData) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    if (userData.role !== 'membre') {
      return res.status(403).json({ message: 'Seuls les membres peuvent réserver.' });
    }

    const prog = await ProgrammeSemaine.findById(programme);
    if (!prog) {
      return res.status(404).json({ message: 'Programme non trouvé.' });
    }

    const existing = await Reservation.findOne({ membre, programme });
    if (existing) {
      return res.status(409).json({ message: 'Vous avez déjà réservé ce programme.' });
    }

    const newReservation = new Reservation({ membre, programme });
    const savedReservation = await newReservation.save();

    res.status(201).json(savedReservation);
  } catch (error) {
    console.error('Erreur lors de la réservation :', error);
    res.status(500).json({ message: "Erreur serveur lors de la création de la réservation." });
  }
};

// 💳 Effectuer un paiement pour une réservation
module.exports.effectuerPaiement = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée.' });
    }

    reservation.paiementEffectué = true;
    await reservation.save();

    res.status(200).json({
      message: 'Paiement effectué avec succès.',
      reservation
    });
  } catch (error) {
    console.error('Erreur lors du paiement :', error);
    res.status(500).json({ message: 'Erreur serveur lors du paiement.' });
  }
};

// 📋 (Optionnel) Récupérer toutes les réservations
module.exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('membre', 'username email')
      .populate('programme');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des réservations.' });
  }
};