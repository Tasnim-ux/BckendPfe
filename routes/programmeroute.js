const express = require('express');
const router = express.Router();
const programmeController = require('../controllers/programmecontroller');

// Créer un programme
router.post('/create', programmeController.createprogramme);
router.get('/coach/:coachId/activites', programmeController.consulterProgrammeCoach);

module.exports = router;

