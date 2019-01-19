const mssql = getHelper('db-mssql');

module.exports = {
    register: (firstName, lastName, email, accesslevel, encryptedPassword) => {
        console.log(firstName, lastName, email, accesslevel, encryptedPassword);
        return new Promise((resolve, reject) => {
            const query =
            `INSERT INTO dbo.Users
                (FirstName, LastName, Email, AccessLevel, EncryptedPassword)
            VALUES('${firstName}', '${lastName}', '${email}', '${accesslevel}', '${encryptedPassword}')`;
            mssql.query(query)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    },
    // check access level?
    getLogin: (email) => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT U.UserID,
                U.Email,
                U.EncryptedPassword,
                U.AccessLevel
            FROM dbo.users AS U
            WHERE Email = '${email}'`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    },
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            const query =
            `SELECT U.Email
            FROM dbo.users AS U`
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
};