const mongoose = require('mongoose');

const programmesemaineSchema = new mongoose.Schema({
  jour: {
    type: String,
    enum: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    required: true
  },
  activité: {
    type: String,
    required: true
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  heureDebut: {
    type: String, // Format: "08:00"
    required: true
  },
  heureFin: {
    type: String, // Format: "09:00"
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('programmesemaine', programmesemaineSchema);
