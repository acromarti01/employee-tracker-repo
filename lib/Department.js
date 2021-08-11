const mysqlPromise = require('mysql2/promise');
const cTable = require('console.table');

class Department {

    constructor() { }

    async getDepartmentNames() {
        const query = "SELECT name FROM department";
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
        const resultsArray = await db_conn.query(query);        
        return resultsArray[0].map(row => row.name);
    }

    async getDepartmentId(department_name) {        
        const query = "SELECT id FROM department WHERE department.name IN (?)";
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
        const resultsArray = await db_conn.query(query, department_name);                 
        return resultsArray[0][0].id;
    }

    async addDepartment(responses) {
        const { department_name } = responses;
        const query = "INSERT INTO department (name) VALUES (?)";
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
        db_conn.query(query, department_name);
        console.log(`${department_name} has been added to Database`);
        db_conn.end();
    }

    async viewAllDepartments() {
        const query = "SELECT * FROM department";
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



module.exports = Department;