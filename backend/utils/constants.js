module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
    EMAIL_SECRET: process.env.EMAIL_SECRET || 'email-secret',
    EMAIL_EXPIRY: process.env.EMAIL_EXPIRY || '2h'
  };
  