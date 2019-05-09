const sql = require('mssql');

const dbConfig = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASS,
    server: process.env.MSSQL_HOST,
    port: Number(process.env.MSSQL_PORT),
    database: process.env.MSSQL_DATABASE,
    options: {
        encrypt: true
    }
};

module.exports = {
    sql: sql,
    query: (query, params) => {
        return new Promise((resolve, reject) => {
            sql.connect(dbConfig, (err) => {
                if (err) {
                    console.log("Error while connecting database :- " + err);
                    reject(err);
                    sql.close();
                } else {
                    let request = new sql.Request();
                    if (Array.isArray(params)) {
                        params.forEach((param) => {
                            request.input(param.name, param.type, param.value);
                        });
                    }
                    request.query(query, (err, result) => {
                        if (err) {
                            console.log("Error while querying database :- " + err);
                            reject(err);
                        } else {
                            resolve(result.recordset);
                        }
                        sql.close();
                    });
                }
            });
        });
    }
};