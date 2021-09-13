require('dotenv').config();
const express = require('express');
const inquirer = require('inquirer')
const { menu_questions, department_questions, role_questions, 
        employee_questions, update_employee_role_questions,  update_managers_questions,
        view_employees_by_manager_questions, view_employees_by_department_questions} = require('./src/questions');
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
        case "View Employees By Manager":
            responses = await inquirer.prompt(view_employees_by_manager_questions);
            await employee.viewEmployeesByManager(responses);
            break;
        case "View Employees By Department":
            responses = await inquirer.prompt(view_employees_by_department_questions);
            await employee.viewEmployeesByDepartment(responses);
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
            responses = await inquirer.prompt(update_employee_role_questions);
            await employee.updateEmployeeRole(responses);
            break; 
        case "Update Employee Manager":
            responses = await inquirer.prompt(update_managers_questions);
            await employee.updateManager(responses);
            break;
        default:
            break;
    }
    await startIt();
}

