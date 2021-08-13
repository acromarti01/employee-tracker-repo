const Department = require("../lib/Department");
const Employee = require("../lib/Employee");
const Role = require("../lib/Role");

module.exports = {
    menu_questions : [
        {
            type: "list",
            name: "options",
            message: "What would you like to do?" ,
            choices:
                ["View All Departments",
                 "View All Roles",
                 "View All Employees",
                 "Add Department",
                 "Add Role",
                 "Add Employee",
                 "Update Employee Role",               
                 "Quit"
                ],
            loop: false
        }
    ],
    department_questions: [
        {
            type: "input",
            name: "department_name",
            message: "What is the name of the department? "
        }
    ],
    role_questions: [
        {
            type: "input",
            name: "role_name",
            message: "What is the name of the role? "
        },
        {
            type: "input",
            name: "role_salary",
            message: "What is the salary of the role? "
        },
        {
            type: "list",
            name: "role_which_department",
            message: "Which department does the role belong to? ",
            choices: async function(){ return await new Department().getDepartmentNames(); },
            loop: false

        }
    ],
    employee_questions: [
        {
            type: "input",
            name: "employee_firstName",
            message: "What is the employee's first name? "
        },
        {
            type: "input",
            name: "employee_lastName",
            message: "What is the employee's last name? "
        },
        {
            type: "list",
            name: "employee_role",
            message: "What is the employee's role? ",
            choices: async function(){ return await new Role().getRoleTitles(); },
            loop: false
        },
        {
            type: "list",
            name: "employee_manager",
            message: "Who is the employee's manager? ",
            choices: async function(){ return await new Employee().getManagerNames(); },
            loop: false                
        }
    ],
    update_questions: [
        {
            type: "list",
            name: "update_employee_name",
            message: "Which employee's role do you want to update? ",
            choices: async function(){ return await new Employee().getEmployeeNames(); },
            loop: false                
        },
        {
            type: "list",
            name: "update_employee_role",
            message: "Which role do you want to assign the selected employee? ",
            choices: async function(){ return await new Role().getRoleTitles(); },
            loop: false                
        }
    ]
}

