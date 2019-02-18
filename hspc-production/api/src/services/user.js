const mssql = getHelper('db-mssql');

module.exports = {
    register: (teamName, firstName, lastName, email, phone, accesslevel, requestlevel, encryptedPassword) => {
        console.log(teamName, firstName, lastName, email, phone, accesslevel, requestlevel, encryptedPassword);
        return new Promise((resolve, reject) => {
            const query =
                `INSERT INTO dbo.Users
                (TeamName, FirstName, LastName, Email, Phone, AccessLevel, RequestLevel, EncryptedPassword)
            VALUES('${teamName}', '${firstName}', '${lastName}', '${email}', '${phone}', '${accesslevel}', '${requestlevel}', '${encryptedPassword}')`;
            mssql.query(query)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    },
    getLogin: (email) => {
        console.log(email);
        return new Promise((resolve, reject) => {
            const query =
                `SELECT U.UserID,
                U.Email,
                U.EncryptedPassword,
                U.AccessLevel
            FROM dbo.Users AS U
            WHERE Email = '${email}'`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    },
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT U.FirstName,
            U.TeamName,
            U.LastName,
            U.Email,
            U.Phone,
            U.AccessLevel
            FROM dbo.Users AS U`
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    },
}