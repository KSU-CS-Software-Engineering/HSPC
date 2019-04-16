const mssql = getHelper('db-mssql');

module.exports = {
    getAllUpgrades: () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT U.FirstName,
            U.TeamName,
            U.LastName,
            U.Email,
            U.Phone,
            U.AccessLevel,
            U.RequestLevel
            FROM dbo.Users AS U
            WHERE U.RequestLevel != ''`
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    },
    removeUpgradeRequest: (email) => {
        return new Promise((resolve, reject) => {
            const query =
            `UPDATE dbo.Users
            set AccessLevel = '1', RequestLevel = ''
            where
                Email = '${email}'`
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    },
    acceptUpgradeRequest: (requestlevel, email) => {
        return new Promise((resolve, reject) => {
            const query =
                `UPDATE dbo.Users
                set AccessLevel = '${requestlevel}', RequestLevel = ''
                where
                    Email = '${email}'`
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}