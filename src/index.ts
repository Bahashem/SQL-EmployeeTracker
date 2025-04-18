import inquirer from "inquirer";
import { connectToDb, pool } from './connection.js';

(async () => {
	await connectToDb();
})();
// View All department
const viewdepartment = async () => {
  try {
    const sql = `SELECT * FROM department`;
    const result = await pool.query(sql);
    console.table(result.rows);
  } catch (err) {
    console.error("Error viewing department:", err);
  }
};

// View all Roles
const viewRoles = async () => {
  try {
    const sql = `SELECT * FROM role`;
    const result = await pool.query(sql);
    console.table(result.rows);
  } catch (err) {
    console.error("Error viewing roles:", err);
  }
};

// View all employees
const viewEmployees = async () => {
  try {
    const sql = "SELECT * FROM employee";
    const result = await pool.query(sql);
    console.table(result.rows);
  } catch (err) {
    console.error("Error viewing employees:", err);
  }
};

// Add a new department
const addDepartment = async (departmentName: string) => {
  try {
    const sql = "INSERT INTO department (name) VALUES ($1)";
    const result = await pool.query(sql, [departmentName]);
    console.log("Department added:", result.rowCount);
  } catch (err) {
    console.error("Error adding department:", err);
  }
};

//add new role
const addRole = async (title: string, salary: number, departmentId: number) => {
  try {
    const sql =
      "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
    const result = await pool.query(sql, [title, salary, departmentId]);
    console.log("Role added:", result.rowCount);
  } catch (err) {
    console.error("Error adding role:", err);
  }
};

// Add Employee
const addEmployee = async (
  firstName: string,
  lastName: string,
  roleId: number,
  managerId: number | null
) => {
  try {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
    const params = [firstName, lastName, roleId, managerId];
    const result = await pool.query(sql, params);
    console.log("Employee added:", result.rowCount);
  } catch (err) {
    console.error("Error adding employee:", err);
  }
};

// Update employee role
const updateEmployeeRole = async (employeeId: number, roleId: number) => {
  try {
    const sql = `UPDATE employee SET role_id = $1 WHERE id = $2`;
    const params = [roleId, employeeId];
    const result = await pool.query(sql, params);
    console.log("Employee role updated:", result.rowCount);
  } catch (err) {
    console.error("Error updating employee role:", err);
  }
};

//Update employee manage
const updateEmployeeManager = async (employeeId: number, managerId: number) => {
  try {
    const sql = `UPDATE employee SET manager_id = $1 WHERE id = $2`;
    const params = [managerId, employeeId];
    const result = await pool.query(sql, params);
    console.log("Employee manager updated:", result.rowCount);
  } catch (err) {
    console.error("Error updating employee manager:", err);
  }
};
//View Employees by Manager
const viewEmployeesByManager = async (managerId: number) => {
  try {
    const sql = `
          SELECT e.id, e.first_name, e.last_name, r.title
          FROM employee e
          JOIN roles r ON e.role_id = r.id
          WHERE e.manager_id = $1
          ORDER BY e.id;
        `;
    const result = await pool.query(sql, [managerId]);
    console.table(result.rows);
  } catch (err) {
    console.error("Error viewing employees by manager:", err);
  }
};

//Delete department
const deletedepartment = async (departmentId: number) => {
  try {
    const sql = `DELETE FROM department WHERE id = $1;`;
    const result = await pool.query(sql, [departmentId]);
    console.log("Department deleted:", result.rowCount);
  } catch (err) {
    console.error("Error deleting department:", err);
  }
};

//Delete Role
const deleteRole = async (role_Id: number) => {
  try {
    const sql = `DELETE FROM role WHERE id = $1;`;
    const result = await pool.query(sql, [role_Id]);
    console.log("Role deleted:", result.rowCount);
  } catch (err) {
    console.error("Error deleting role:", err);
  }
};

//delete employees
const deleteEmployee = async (employeeId: number) => {
  try {
    const sql = `DELETE FROM employee WHERE id = $1;`;
    const result = await pool.query(sql, [employeeId]);
    console.log("Employee deleted:", result.rowCount);
  } catch (err) {
    console.error("Error deleting employee:", err);
  }
};
//Update Employee Role
case "Update an Employee Role":
	return inquirer
	  .prompt([
		{
		  name: "employeeId",
		  type: "number",
		  message: "Enter the employee ID:",
		},
		{
		  name: "roleId",
		  type: "number",
		  message: "Enter the new role ID:",
		},
	  ])
	  .then(({ employeeId, roleId }) =>
		updateEmployeeRole(employeeId, roleId)
	  );

  //Update an employee Manager
  case "Update an Employee Manager":
	return inquirer
	  .prompt([
		{
		  name: "employeeId",
		  type: "number",
		  message: "Enter the employee ID:",
		},
		{
		  name: "managerId",
		  type: "number",
		  message: "Enter the new manager ID:",
		},
	  ])
	  .then(({ employeeId, managerId }) =>
		updateEmployeeManager(employeeId, managerId)
	  );

  //View employees by Manager
  case "View Employees by Manager":
	return inquirer
	  .prompt([
		{
		  name: "managerId",
		  type: "number",
		  message: "Enter the manager ID:",
		},
	  ])
	  .then(({ managerId }) => viewEmployeesByManager(managerId)
	);

  //Delete department
  case "Delete Department":
	return inquirer
	  .prompt([
		{
		  name: "departmentId",
		  type: "number",
		  message: "Enter the department ID to delete:",
		},
	  ])
	  .then(({ departmentId }) => deletedepartment(departmentId));
	  
	  //Delete Role
	  case "Delete Role":
		return inquirer
		  .prompt([
			{
		  name: "roleId",
		  type: "number",
		  message: "Enter the ID of the role to delete:",
			  
			},
		  ])
		  .then(({ roleId }) => deleteRole(roleId));

	  //Delete Employee
  case "Delete Employee":
	return inquirer
	  .prompt([
		{
		  name: "employeeId",
		  type: "number",
		  message: "Enter the employee ID to delete:",
		},
	  ])
	  .then(({ employeeId }) => deleteEmployee(employeeId));


inquirer
  .prompt([
    {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All department",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Update a Employee Manager",
        "View Employees by Manager",
        "Delete department",
        "Delete Role",
        "Delete Employee",
        "Exit",
      ],
    },
  ])
  .then(({ action }) => {
    switch (action) {
      case "View All department":
        return viewdepartment();
      case "View All Roles":
        return viewRoles();
      case "View All Employees":
        return viewEmployees();
      case "Add a Department":
        return inquirer
          .prompt([
            {
              name: "departmentName",
              type: "input",
              message: "Enter the name of the department:",
            },
          ])
          .then(({ departmentName }) => addDepartment(departmentName));

      //Add a Role
      case "Add a Role":
        return inquirer
          .prompt([
            {
              name: "title",
              type: "input",
              message: "Enter the title of the role:",
            },
            {
              name: "salary",
              type: "number",
              message: "Enter the salary for the role:",
            },
            {
              name: "departmentId",
              type: "number",
              message: "Enter the department ID for the role:",
            },
          ])
          .then(({ title, salary, departmentId }) =>
            addRole(title, salary, departmentId)
          );

      //Add Employee
      case "Add a Employee":
        return inquirer
          .prompt([
            {
              name: "firstName",
              type: "input",
              message: "Enter the first name of the employee:",
            },
            {
              name: "lastName",
              type: "input",
              message: "Enter the last name of the employee:",
            },
            {
              name: "roleId",
              type: "number",
              message: "Enter the role ID for the employee:",
            },
            {
              name: "managerId",
              type: "number",
              message:
                "Enter the manager ID for the employee (or leave blank for none):",
            },
          ])
          .then(({ firstName, lastName, roleId, managerId }) =>
            addEmployee(firstName, lastName, roleId, managerId)
          );

      
      case "Exit":
        return process.exit();
    }
  });





