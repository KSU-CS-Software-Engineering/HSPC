const mssql = getHelper('db-mssql');

module.exports = {
    addParticipant: (TeamName, SchoolName, StateCode, QuestionLevel, EventDate) => {
        return new Promise((resolve, reject) => {
            const query =
                `INSERT INTO dbo.Participants
                (TeamName, SchoolName, StateCode, QuestionLevel, EventDate)
            VALUES('${TeamName}', '${SchoolName}', '${StateCode}', '${QuestionLevel}', '${EventDate}')`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    },
    getAllParticipants: () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT 
                P.TeamName, P.SchoolName, P.StateCode, P.QuestionLevel, P.EventDate
                FROM dbo.Participants AS P`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}