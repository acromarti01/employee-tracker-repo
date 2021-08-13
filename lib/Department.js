const cTable = require('console.table');
const getConnection = require('../config/connection');

class Department {

    constructor() { }

    async getDepartmentNames() {
        const query = `
            SELECT name 
            FROM department
        `;
        const db_conn = await getConnection();
        const [rows, fields] = await db_conn.query(query);
        db_conn.end();        
        return rows.map(row => row.name);
    }

    async getDepartmentId(department_name) {        
        const query = `
            SELECT id FROM department 
            WHERE department.name IN (?)
        `;
        const db_conn = await getConnection();
        const [rows, fields] = await db_conn.query(query, department_name);
        db_conn.end();                 
        return rows[0].id;
    }

    async addDepartment(responses) {
        const { department_name } = responses;
        const query = `
            INSERT INTO department (name) 
            VALUES (?)
        `;
        const db_conn = await getConnection();
        await db_conn.query(query, department_name);
        console.log(`Added ${department_name} to the database`);
        db_conn.end();
    }

    async viewAllDepartments() {
        const query = `
            SELECT * 
            FROM department
        `;
        const db_conn = await getConnection();
        const [rows, fields] = await db_conn.query(query);
        console.log(cTable.getTable(rows));
        db_conn.end();
    }

}

module.exports = Department;