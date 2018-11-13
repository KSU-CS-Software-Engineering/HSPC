const mssql = getHelper('db-mssql');

module.exports = {
    register: (firstName, lastName, email, encryptedPassword) => {
        return new Promise((resolve, reject) => {
            const query =
            `INSERT INTO dbo.Users
                (FirstName, LastName, Email, EncryptedPassword)
            VALUES('${firstName}', '${lastName}', '${email}', '${encryptedPassword}')`;
            mssql.query(query)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    },
    getLogin: (email) => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT U.UserID,
                U.Email,
                U.EncryptedPassword
            FROM dbo.users AS U
            WHERE Email = '${email}'`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
};