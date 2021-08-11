require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
const inquirer = require('inquirer')
const cTable = require('console.table');
const { menu_questions, department_questions, role_questions, employee_questions } = require('./src/questions');
const Department = require("./lib/Department");
const Role = require("./lib/Role");
const Employee = require('./lib/Employee');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database

async function getConnection()
{
    const db_conn = await mysqlPromise.createConnection(
        {
            host: process.env.HOST || 'localhost',
            // MySQL username,
            user: process.env.DB_USERNAME || 'root',
            // MySQL password
            password: process.env.DB_PASSWORD || '',
            database: process.env.DATABASE || 'employee_tracker_db',
        },
        console.log(`Connected to the employee_tracker_db database.`)
    );
    return db_conn;
}

startIt();
async function startIt()
{
    let responses;
    const department = new Department();
    const role = new Role();
    const employee = new Employee();
    const answer = await inquirer.prompt(menu_questions);
    switch (answer.options)
    {
        case "View All Departments":            
            department.viewAllDepartments().then(res => startIt());
            break;
        case "View All Roles":
            role.viewAllRoles().then(res => startIt());
            break; 
        case "View All Employees":
            employee.viewAllEmployees().then(res => startIt());
            break;
        case "Add Department":            
            responses = await inquirer.prompt(department_questions);
            department.addDepartment(responses).then(res => startIt());
            break;
        case "Add Role":
            responses = await inquirer.prompt(role_questions);
            role.addRole(responses).then(res => startIt());
            break;
        case "Add Employee":
            responses = await inquirer.prompt(employee_questions);
            employee.addEmployee(responses).then(res => startIt());
            break;                   
        default:
            break;
    }
    //return answer;
}









//getDepartmentNames();





function Nothing(){

}




// viewMenu();
// async function viewMenu() {
//     const response = await inquirer.prompt(menu_questions);
//     const view = {
//         "View All Departments": viewDepartments(),
//         "View All Roles": Nothing(),
//         "View All Employees": Nothing(),
//         // "Add Department": Nothing(),
//         // "Add Role": Nothing(),
//         // "Add Employee": Nothing(),
//         // "Update Employee Role": Nothing(),
//         "Quit": Nothing()
//     };
//     console.log(view[response.options]);  
// }



// query = 
// app.get('/api/course/:name/:dept', (req, res) => {
//     db.query(
//         'SELECT * FROM course_names WHERE name LIKE ? AND department IN (?)',
//         [req.params.name, req.params.dept],
//         function (err, results) {
//             res.json(results);
//         }
//     );
// });

// app.post('/api/course', (req, res) => {
//     const { department, name, total_enrolled } = req.body;

//     const query = `
//       INSERT INTO course_names (department, name, total_enrolled)
//       VALUES (?,?,?)
//     `;
//     db.query(query, [department, name, total_enrolled], function (err, results) {
//         res.json(results);
//     });
// });

// app.put('/api/course/:id', (req, res) => {
//     const { department, name, total_enrolled } = req.body;

//     const query = `
//       UPDATE course_names
//       SET department = ?, name = ?, total_enrolled = ?
//       WHERE id = ?
//     `;
//     const q = db.query(
//         query,
//         [department, name, total_enrolled, req.params.id],
//         function (err, results) {
//             res.json(results);
//         }
//     );
//     console.log(q.sql);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });


