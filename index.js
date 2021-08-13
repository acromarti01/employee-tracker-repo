require('dotenv').config();
const express = require('express');
const inquirer = require('inquirer')
const { menu_questions, department_questions, role_questions, employee_questions, update_questions } = require('./src/questions');
const Department = require("./lib/Department");
const Role = require("./lib/Role");
const Employee = require('./lib/Employee');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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
            await department.viewAllDepartments(); 
            break;
        case "View All Roles":
            await role.viewAllRoles();
            break; 
        case "View All Employees":
            await employee.viewAllEmployees();
            break;
        case "Add Department":            
            responses = await inquirer.prompt(department_questions);
            await department.addDepartment(responses);
            break;
        case "Add Role":
            responses = await inquirer.prompt(role_questions);
            await role.addRole(responses);
            break;
        case "Add Employee":
            responses = await inquirer.prompt(employee_questions);
            await employee.addEmployee(responses);
            break; 
        case "Update Employee Role":
            responses = await inquirer.prompt(update_questions);
            await employee.updateEmployeeRole(responses);
            break;                  
        default:
            break;
    }
    await startIt();
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


