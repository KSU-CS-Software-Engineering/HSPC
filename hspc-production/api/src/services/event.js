const mssql = getHelper('db-mssql');

module.exports = {
    createEvent: (eventLocation, eventDate, eventTime, eventDes) => {
        console.log(eventLocation, eventDate, eventTime);
        return new Promise((resolve, reject) => {
            const query =
                `INSERT INTO dbo.Competition
                (EventLocation, EventDate, EventTime, EventDescription)
            VALUES('${eventLocation}', '${eventDate}', '${eventTime}', '${eventDes}')`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    },
    getEventHistory: () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT 
                C.CompetitionID, C.EventLocation, C.EventDate, C.EventTime, C.EventDescription 
                FROM dbo.Competition AS C`;
            mssql.query(query)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}