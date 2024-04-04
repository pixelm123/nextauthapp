const crypto = require('crypto');

// Generate a random string of specified length
const generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

// Generate a random string with 32 characters (for example)
const tokenSecret = generateRandomString(32);
console.log(tokenSecret);
