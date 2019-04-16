const mssql = getHelper('db-mssql');

module.exports = {
    createNews: (articleTitle, articleSubHeading, articleMessage, articleDate) => {
        return new Promise((resolve, reject) => {
            const query =
                `INSERT INTO dbo.Article
                (ArticleTitle, ArticleSubHeading, ArticleMessage, ArticleDate)
            VALUES('${articleTitle}', '${articleSubHeading}', '${articleMessage}', '${articleDate}')`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    },
    getNewsHistory: () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT 
                A.ArticleTitle, A.ArticleSubHeading, A.ArticleMessage, A.ArticleDate 
                FROM dbo.Article AS A`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}