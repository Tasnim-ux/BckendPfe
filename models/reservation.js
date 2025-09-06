const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  membre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  programme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'programmesemaine',
    required: true
  },
  paiementEffectué: {
    type: Boolean,
    default: false
  },
  dateReservation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
