-- VWHEN I choose to view all departments
-- THEN I am presented with a formatted table showing department names and department ids
SELECT * FROM department;

-- WHEN I choose to view all roles
-- THEN I am presented with the job title, role id, the department that role belongs to, 
-- and the salary for that role
SELECT role.id, role.title, department.name, role.salary 
FROM role
LEFT JOIN department ON department_id = department.id;

-- VIEW ALL ROLES (VERSION 2) ASK ABOUT THIS!!!!!!!;
-- SELECT role.id, role.title, department.name, role.salary FROM role, department WHERE department_id = department.id;

-- WHEN I choose to view all employees
-- THEN I am presented with a formatted table showing employee data, 
-- including employee ids, first names, last names, job titles, departments, salaries, 
-- and managers that the employees report to
-- SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary  
-- FROM employee, role, department
-- WHERE department.id = department_id AND role.id = role_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary
FROM ((role
INNER JOIN employee ON role.id = employee.role_id)
INNER JOIN department ON role.department_id = department.id);