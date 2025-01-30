const bcrypt = require("bcrypt");

const hash = (pass) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(14, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const compare = (pass, hashed) => {
  return bcrypt.compare(pass, hashed);
};

module.exports = {
  hash,
  compare,
};
