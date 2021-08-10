const Department = require("../lib/Department");

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
            choices: async function(){                 
                return await getDepartmentNames();
            }

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
            type: "input",
            name: "employee_role",
            message: "What is the employee's role? ",
            choices:
                [
                 "Sales Lead",
                 "Salesperson",
                 "Lead Engineer",
                 "Software Engineer",
                 "Account Manager",
                 "Accountant",
                 "Legal Team Lead",
                 "Lawyer",
                 "Customer Service"                
                ],
            loop: false
        },
        {
            type: "input",
            name: "employee_manager",
            message: "Who is the employee's manager? ",
            choices:
                [
                 "FILL IN USING MYSQL!!!!!",             
                ],
            loop: false
        }
    ]

}

async function getDepartmentNames()
{
    const res = await new Department().getDepartmentNames();
    console.log(res);
    return res;
        //console.log(Array.isArray(res));
    //console.log(res[0], typeof(res[0]));
        
}