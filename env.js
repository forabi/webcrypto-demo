exports.isProduction = process.env.NODE_ENV === 'production';
exports.isDevelopment = process.env.NODE_ENV === 'development';
exports.isHot = Boolean(process.env.HOT);
exports.isCI = Boolean(process.env.CI);