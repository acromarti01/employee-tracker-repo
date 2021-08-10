const mysqlPromise = require('mysql2/promise');
const cTable = require('console.table');

class Role {

    constructor() {}

    async viewAllRoles() {
        const query = "SELECT role.id, role.title, department.name, role.salary FROM role LEFT JOIN department ON department_id = department.id";
        const db_conn = await mysqlPromise.createConnection(
            {
                host: process.env.HOST || 'localhost',
                // MySQL username,
                user: process.env.DB_USERNAME || 'root',
                // MySQL password
                password: process.env.DB_PASSWORD || '',
                database: process.env.DATABASE || 'employee_tracker_db',
            }
        );
        const results = await db_conn.query(query);
        console.log(cTable.getTable(results[0]));
        db_conn.end();
    }


}

module.exports = Role;