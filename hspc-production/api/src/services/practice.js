const mssql = getHelper('db-mssql');

module.exports = {
    addPractice: (practice) => {
        return new Promise((resolve, reject) => {
            const query =
                `INSERT INTO dbo.Files(FileData, FileType, FileGroup)
            VALUES(@practice, '${practice.mimetype}', 'Practice')`;
            mssql.query(query, [{
                name: 'practice',
                type: mssql.sql.VarBinary(mssql.sql.MAX),
                value: practice.buffer
            }])
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    },
    getAllPractice: () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT * FROM dbo.Files`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}