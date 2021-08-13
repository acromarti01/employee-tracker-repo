const cTable = require('console.table');
const getConnection = require('../config/connection');
const Department = require("./Department");

class Role {

    constructor() {}

    async getRoleTitles() {
        const query = `
            SELECT title 
            FROM role
        `;
        const db_conn = await getConnection();
        const [rows, fields] = await db_conn.query(query);
        db_conn.end();
        return rows.map(row => row.title);
    }

    async getRoleId(role_title) {        
        const query = `
            SELECT id FROM role 
            WHERE role.title IN (?)
        `;
        const db_conn = await getConnection(); 
        const [rows, fields] = await db_conn.query(query, role_title);
        db_conn.end();                 
        return rows[0].id;
    }
        
    async addRole(responses) {
        const { role_name, role_salary, role_which_department } = responses;
        const department_id = await new Department().getDepartmentId(role_which_department);
        const query = `
            INSERT INTO role (title, salary, department_id) 
            VALUES (?,?,?)
        `;
        const db_conn = await getConnection();
        await db_conn.query(query, [role_name, role_salary, department_id]);
        console.log(`Added ${role_name} to the database`);
        db_conn.end();
    }

    async viewAllRoles() {
        const query = `
            SELECT role.id, role.title, department.name, role.salary 
            FROM role 
            LEFT JOIN department ON department_id = department.id
        `;
        const db_conn = await getConnection();
        const [rows, fields] = await db_conn.query(query);
        console.log(cTable.getTable(rows));
        db_conn.end();
    }
}

module.exports = Role;