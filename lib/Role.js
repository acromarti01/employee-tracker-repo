const mysqlPromise = require('mysql2/promise');
const cTable = require('console.table');
const Department = require("./Department");

class Role {

    constructor() {}

    async getRoleTitles() {
        let titles = [];
        const query = "SELECT title FROM role";
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
        titles = results[0].map(row => row.title);
        return titles;
    }
        
    async addRole(responses) {
        const { role_name, role_salary, role_which_department } = responses;
        const department_id = await new Department().getDepartmentId(role_which_department);
        const query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
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
        db_conn.query(query, [role_name, role_salary, department_id]);
        console.log(`${role_name} has been added to Database`);
        db_conn.end();
    }

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