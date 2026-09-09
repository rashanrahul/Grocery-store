const jwt = require('jsonwebtoken');

// Login
exports.login = async (req, res) => {
  try {
    const { password } = req.body;
    
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ 
      token, 
      message: 'Login successful',
      expiresIn: '7d'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify token
exports.verify = async (req, res) => {
  res.json({ authenticated: true, role: 'admin' });
};

// Logout
exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};