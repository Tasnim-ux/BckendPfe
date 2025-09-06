const express = require('express');
const router = express.Router();
const reservationcontroller = require('../controllers/reservationcontroller');

// ✅ Créer une réservation
router.post('/create', reservationcontroller.createreservation);

// ✅ Effectuer un paiement pour une réservation
router.put('/paye/:id', reservationcontroller.effectuerPaiement);

// ✅ (Optionnel) Récupérer toutes les réservations
router.get('/all', reservationcontroller.getAllReservations);

module.exports = router;