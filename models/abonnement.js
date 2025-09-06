const mongoose = require('mongoose');
const abonnementSchema = new mongoose.Schema({
  membre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['hebdomadaire', 'mensuel', 'annuel'],
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  statut: {
    type: String,
    enum: ['actif', 'expiré'],
    default: 'actif'
  }
}, { timestamps: true });

module.exports = mongoose.model('Abonnement', abonnementSchema);
