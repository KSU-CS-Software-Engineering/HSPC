const bcrypt = require('bcrypt');

module.exports = {
    generateHash: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    },
    checkPassword: (password, hashedPassword) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, (err, res) => {
                if (res) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }
}