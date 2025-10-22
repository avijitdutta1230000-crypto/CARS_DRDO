const mongoose = require('mongoose');

const PIFormSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  email: String,
  department: String,
  designation: String,
  instituteName: String,
  contactNumber: String,
  projectTitle: String,
  projectDuration: String,
  abstract: String,
  budgetEstimate: String
}, { timestamps: true });

module.exports = mongoose.models.PIForm || mongoose.model('PIForm', PIFormSchema);
