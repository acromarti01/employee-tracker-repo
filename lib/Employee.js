const mysqlPromise = require('mysql2/promise');
const cTable = require('console.table');

class Employee {

    constructor() { }

    async viewAllEmployees() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee, role, department WHERE department.id = department_id AND role.id = role_id"
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

module.exports = Employee;