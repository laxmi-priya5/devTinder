// const app = require("../src/app");

// module.exports = app;
// index.js   (place in ROOT of your project - same level as package.json)

const app = require("./src/app");

// VERY IMPORTANT: Do NOT add app.listen() here!
// Vercel will handle it automatically in serverless environment

module.exports = app;
