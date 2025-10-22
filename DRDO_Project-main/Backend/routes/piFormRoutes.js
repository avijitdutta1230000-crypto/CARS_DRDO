const express = require('express');
const router = express.Router();
const PIForm = require('../models/PIForm');
const { submitPIForm, getPIForm } = require('../controllers/piFormController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/submit', protect, submitPIForm);
router.get('/myform', protect, getPIForm);

router.get('/pi-list', protect, async (req, res) => {
  try {
    let institute = req.query.institute;
    if (!institute) {
      return res.status(400).json({ message: 'Institute name is required' });
    }

    console.log("Searching PI names for institute:", institute);

    const piNames = await PIForm.find({
      instituteName: { $regex: institute, $options: 'i' }
    }).distinct('piName');

    console.log("Matched PI names:", piNames);

    res.json(piNames);
  } catch (err) {
    console.error('Error fetching PI names:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
