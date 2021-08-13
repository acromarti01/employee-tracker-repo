-- VWHEN I choose to view all departments
-- THEN I am presented with a formatted table showing department names and department ids
-- SELECT * FROM department;

-- WHEN I choose to view all roles
-- THEN I am presented with the job title, role id, the department that role belongs to, 
-- and the salary for that role
-- SELECT role.id, role.title, department.name, role.salary 
-- FROM role
-- LEFT JOIN department ON department_id = department.id;

-- WHEN I choose to view all employees
-- THEN I am presented with a formatted table showing employee data, 
-- including employee ids, first names, last names, job titles, departments, salaries, 
-- and managers that the employees report to

-- SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary  
-- FROM employee, role, department
-- WHERE department.id = department_id AND role.id = role_id;


SELECT e.first_name as fname, e.last_name, concat(m.first_name + ' ' + m.last_name) as managers_name, e.manager_id
FROM employee e 
LEFT JOIN employee m ON (e.id = m.manager_id);

SELECT e.first_name, e.last_name, concat(m.first_name," ",m.last_name) as managers_name, e.manager_id, m.manager_id 
FROM employee e
LEFT JOIN employee m ON (e.id = m.manager_id);


SELECT * 
FROM employee e
LEFT JOIN employee m ON (e.id = m.manager_id); 

SELECT *
FROM employee e
LEFT JOIN employee m ON (e.id = m.manager_id AND m.id IS NOT NULL);
 


