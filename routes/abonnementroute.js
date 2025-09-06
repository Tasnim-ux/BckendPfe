const express = require('express');
const router = express.Router();
const abonnementController = require('../controllers/abonnementcontroller');

// ✅ ADMIN : Créer un abonnement pour un membre
router.post('/admin/create', abonnementController.createAbonnement); // renommée pour clarifier

// ✅ ADMIN : Ajouter et assigner un abonnement à un membre (version combinée)
router.post('/admin/assign', abonnementController.ajouterAbonnementPourMembre);

// ✅ ADMIN : Modifier un abonnement
router.put('/admin/update/:id', abonnementController.updateAbonnement);

// ✅ ADMIN : Supprimer un abonnement
router.delete('/admin/delete/:id', abonnementController.deleteAbonnement);

// ✅ ADMIN : Voir tous les abonnements
router.get('/admin/all', abonnementController.getAllAbonnements);

// ✅ MEMBRE : Choisir un abonnement déjà créé
router.post('/choisir', abonnementController.choisirAbonnement);
