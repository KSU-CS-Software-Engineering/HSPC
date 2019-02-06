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
    getLogin: (email) => {
        console.log(email);
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
            `SELECT U.FirstName,
            U.LastName,
            U.Email
            FROM dbo.users AS U`
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    },
    registerTeam: (teamName, schoolName, schoolAddress, stateCode, questionLevel) => {
        console.log(teamName, schoolName, schoolAddress, stateCode, questionLevel);
        return new Promise((resolve, reject) => {
            const query =
            `INSERT INTO dbo.Teams
                (TeamName, SchoolName, SchoolAddress, StateCode, QuestionLevel)
            VALUES('${teamName}', '${schoolName}', '${schoolAddress}', '${stateCode}', '${questionLevel}')`;
            mssql.query(query)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    }
}