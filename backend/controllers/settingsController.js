const Settings = require('../models/Settings');

// Get settings (public)
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update settings (admin only)
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    const { name, tagline, phone, address, mapUrl, openTime, closeTime, openDays } = req.body;
    
    settings.name = name || settings.name;
    settings.tagline = tagline || settings.tagline;
    settings.phone = phone || settings.phone;
    settings.address = address || settings.address;
    settings.mapUrl = mapUrl || settings.mapUrl;
    settings.openTime = openTime || settings.openTime;
    settings.closeTime = closeTime || settings.closeTime;
    if (openDays) settings.openDays = openDays;

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};