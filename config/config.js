const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_TTL: process.env.JWT_TTL || '7d',
  NODE_ENV: process.env.NODE_ENV || 'dev',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/bitfilmsdb',
  PORT: process.env.PORT || '3000',
};

module.exports = config;
