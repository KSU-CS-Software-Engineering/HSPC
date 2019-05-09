const mssql = getHelper('db-mssql');

module.exports = {
    createCards: (file) => {
        return new Promise((resolve, reject) => {
            const query =
                `INSERT INTO dbo.Cards
                (CardFile)
            VALUES('${file}')`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    },
    getAllCards: () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT C.CardFile 
                FROM dbo.Card AS C`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}