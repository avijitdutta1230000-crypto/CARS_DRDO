const PIForm = require('../models/PIForm');

exports.submitPIForm = async (req, res) => {
  try {
    // Save form with the logged-in user's ID
    const newForm = new PIForm({ ...req.body, user: req.user.id });
    await newForm.save();
    res.status(201).json({ message: 'PI Form submitted successfully.' });
  } catch (err) {
    console.error('Submit PI Form error:', err);
    res.status(500).json({ error: 'Form submission failed.' });
  }
};

exports.getPIForm = async (req, res) => {
  try {
    // Find form by logged-in user ID
    const form = await PIForm.findOne({ user: req.user.id });
    if (!form) {
      return res.status(404).json({ message: 'No form found for this user.' });
    }
    res.status(200).json(form);
  } catch (err) {
    console.error('Get PI Form error:', err);
    res.status(500).json({ error: 'Could not fetch form.' });
  }
};
