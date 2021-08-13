const cTable = require('console.table');
const Role = require("./Role");
const getConnection = require('../config/connection');

class Employee {

    constructor() { }

    async getEmployeeNames() {
        const query = `
            SELECT first_name, last_name 
            FROM employee
        `;
        const db_conn = await getConnection();
        const [rows, fields] = await db_conn.query(query);
        db_conn.end();
        return rows.map(row => row.first_name + " " + row.last_name);        
    }

    async addEmployee(responses) {
        const { employee_firstName, employee_lastName, employee_role, employee_manager } = responses;
        const roleId = await new Role().getRoleId(employee_role);
        const managerId = await this.getManagerId(employee_manager);
        const query = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES (?,?,?,?)
        `;
        const db_conn = await getConnection();
        await db_conn.query(query, [employee_firstName, employee_lastName, roleId, managerId]);
        db_conn.end();
        console.log(`Added ${employee_firstName} ${employee_lastName} to the database`);        
    }

    async viewAllEmployees() {
        const query = `
            SELECT m.id, m.first_name, m.last_name, r.title, d.name, r.salary, concat(e.first_name, " ", e.last_name) as managers_name
            FROM employee e
            RIGHT JOIN employee m ON (e.id = m.manager_id)
            RIGHT JOIN role r ON (m.role_id = r.id)
            RIGHT JOIN department d ON (r.department_id = d.id)
        `;
        const db_conn = await getConnection();
        const [rows, fields] = await db_conn.query(query);
        console.log(cTable.getTable(rows));
        db_conn.end();
    }

    async getManagerId(fullName) {
        const nameArray = fullName.split(" ");
        const query = `
            SELECT id FROM employee 
            WHERE employee.first_name IN (?) AND employee.last_name IN (?)
        `;
        const db_conn = await getConnection();
        const [rows, fields] = await db_conn.query(query, [nameArray[0], nameArray[1]]);
        db_conn.end();
        return rows[0].id; 
    }

    async updateEmployeeRole(responses) {
        const { update_employee_name, update_employee_role } = responses;
        const nameArray = update_employee_name.split(" ");
        const roleId = await new Role().getRoleId(update_employee_role);
        const query = `
            UPDATE employee
            SET role_id = ?
            WHERE first_name IN (?) AND last_name IN (?)
        `;
        const db_conn = await getConnection();
        await db_conn.query(query, [roleId, nameArray[0], nameArray[1]]);
        console.log("Updated employee's role");
        db_conn.end();
    }

}

module.exports = Employee;