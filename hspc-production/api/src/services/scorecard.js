const mssql = getHelper('db-mssql');

module.exports = {
    addScore: (scorecard) => {
        console.log(scorecard);
        return new Promise((resolve, reject) => {
            const query =
                `INSERT INTO dbo.Files(FileData, FileType)
            VALUES(@scorecard, '${scorecard.mimetype}')`;
            mssql.query(query, [{
                name: 'scorecard',
                type: mssql.sql.VarBinary(mssql.sql.MAX),
                value: scorecard.buffer
            }])
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    },
    getAllScores: () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT * FROM dbo.Files`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}