const mssql = getHelper('db-mssql');

module.exports = {
    registerTeam: (teamName, schoolName, schoolAddress, stateCode, questionLevel, advisor, advisorEmail) => {
        return new Promise((resolve, reject) => {
            const query =
                `INSERT INTO dbo.Teams
                (TeamName, SchoolName, SchoolAddress, StateCode, QuestionLevel, AdvisorName, AdvisorEmail)
            VALUES('${teamName}', '${schoolName}', '${schoolAddress}', '${stateCode}', '${questionLevel}', '${advisor}', '${advisorEmail}')`;
            mssql.query(query)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    },
    getAllTeams: () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT T.TeamName, 
            T.SchoolName, 
            T.SchoolAddress, 
            T.StateCode, 
            T.QuestionLevel,
            T.AdvisorName,
            T.AdvisorEmail
            FROM dbo.Teams as T`
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}