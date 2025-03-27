const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  type: { type: String, enum: ['facebook', 'linkedin', 'twitter'], required: true },
  url: { type: String, required: true }
});

const affiliationSchema = new mongoose.Schema({
  organization: { type: String, required: true },
  team: String,
  country: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  socialLinks: [socialSchema],
  affiliations: [affiliationSchema],
  researchInterests: [String]
});

module.exports = mongoose.model('User', userSchema);