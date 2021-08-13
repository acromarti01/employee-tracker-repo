const mysqlPromise = require('mysql2/promise');

async function getConnection() {
    const connection = await mysqlPromise.createConnection(
        {
            host: process.env.HOST || 'localhost',
            // MySQL username,
            user: process.env.DB_USERNAME || 'root',
            // MySQL password
            password: process.env.DB_PASSWORD || '',
            database: process.env.DATABASE || 'employee_tracker_db',
        }
    );
    return connection;
}

module.exports = getConnection;
