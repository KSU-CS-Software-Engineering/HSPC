const mssql = getHelper('db-mssql');

module.exports = {
    getAllTeams: () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT T.TeamName, 
            T.SchoolName, 
            T.SchoolAddress, 
            T.StateCode, 
            T.QuestionLevel
            FROM dbo.Teams as T`
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}