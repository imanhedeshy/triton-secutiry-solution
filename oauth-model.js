const oauthModel = require("./oauth-model");

const jwt = require("jsonwebtoken");
const knex = require("knex");
const dbConfig = require("./knexfile");

const database = knex(dbConfig.development);

const JWT_SECRET = process.env.JWT_SECRET;

// Generates an OAuth 2.0 authorization code
async function generateAuthorizationCode(platformId, userId) {
  try {
    const authCodePayload = { platformId, userId };
    const authorizationCode = jwt.sign(authCodePayload, JWT_SECRET, {
      expiresIn: "5m", // Set expiration time for the authorization code
    });

    return authorizationCode;
  } catch (error) {
    throw new Error("Failed to generate authorization code");
  }
}

// Validates an OAuth 2.0 authorization code
async function validateAuthorizationCode(authorizationCode) {
  try {
    const decodedToken = jwt.verify(authorizationCode, JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid authorization code");
  }
}

module.exports = {
  generateAuthorizationCode,
  validateAuthorizationCode,
};
