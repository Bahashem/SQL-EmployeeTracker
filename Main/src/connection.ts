import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

import inquirer from 'inquirer'

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
      };
      } catch (err) {
          console.error('Error viewing departments:', err);
      }
  ;

//View all Departments
const viewDepartments = async ()=> {
    try {        
    const sql = `SELECT * FROM departments`;
    pool.query (sql, (err: Error, result: QueryResult) => {
        if (err) {
        console.table(result);
        };
          } else {
              console.table(result);
          }
      });
    } catch (err) {
      console.error('Error viewing departments:', err);
    }
  };
//View all Roles
const viewRoles = async ()=> {
        try{            
    const sql = `SELECT * FROM roles`;    
    pool.query(sql, (err: Error, result: QueryResult) => {
        if (err) {
          console.table(result);
        }
    }
//View all employees
const viewEmployees = async ()=> {
        try{                
    const sql = `SELECT * FROM employees`;
        pool.query(sql, (err: Error, result: QueryResult) => {
            if (err) {
              console.table(result);
            }
        }
// Add a department
const addDepartment = async ()=>{
        try{                 
    const sql = `INSERT INTO department (name) VALUES ($1)', [name]`;
                        const params = [department.name];            
        pool.query(sql, params,(err: result) => {
            if (err) {
               console.table(result);
             }
}
//Add a role
const addRole = async ()=> {
        try{                 
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [name];
            const params = [role.title, salary, department_id];            
        pool.query(sql, params,(err: result) => {
            if (err) {
               console.table(result);
        }
}
// Add Employee
const addEmployee = async ()=> {
    try{                 
const sql = `INSERT INTO employee (employee.first_Name, employee.last_Name, employee.role_id, employee.manager_id) VALUES ($1,$2,$3,$4)', [name];
                    const params = [];            
    pool.query(sql, params,(err: result) => {
        if (err) {
           console.table(result);
         }
} 
//Update employee role      
const sql = `UPDATE employee SET role_id = $1 WHERE id = $2`;
  const params = [req.body.employee, req.params.id];

  pool.query(sql, params, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Error updating employee role',
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.rowCount,
      });
    };
    //Update employee managers
    const sql = `UPDATE employee SET manager_id = $1 WHERE id = $2`;
  const params = [req.body.review, req.params.id];

  pool.query(sql, params, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Error updating employee manager',
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
   
      });
    }
    ;
   //View employees by department
    const sql = `SELECT department.id,
    JOIN employee 
     ON employee.department_id = department.id`;
    employee.last_name
    FROM department
    JOIN employee 
     ON employee.department_id = department_id;

  pool.query(sql, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const { rows } = result;
    res.json({
      message: 'success',
      data: rows,
    });
  });
  //delete department
  const sql = `DELETE FROM department WHERE id = $1`;
  const params = [req.params.id]; 
  pool.query(sql, params, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Error deleting department',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.rowCount,
      });
    }
  });
  //delete roles
  const sql = `DELETE FROM roles WHERE id = $1`;
  const params = [req.params.id]; 
  pool.query(sql, params, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Error deleting roles',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.rowCount,
      });
    }
  });
  //delete employees
  const sql = `DELETE FROM employees WHERE id = $1`;
  const params = [req.params.id]; 
  pool.query(sql, params, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Error deleting employees',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.rowCount,
      });
    }
  });
inquirer.prompt([
    {
        name: 'action',
        type:'list',
        message:'What would you like to do?',
        choices:[
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Update a Employee Manager',
            'View Employees by Manager',
            'Delete Departments',
            'Delete Roles',
            'Delete Employees',
            'Exit',
        ]
    }
])
.then ((data) => {
    const action = data.action

switch (action) {
    case 'View All Departments':
        return viewDepartments();
    case 'View All Roles':
        return viewRoles();
    case 'View All Employees':
        return viewEmployees();
    case 'Add Department':
        return addDepartment();
    case 'Add a Role':
        return addRole();
    case 'Add a Employee':
        return addEmployee();
    case 'Update an Employee Role':
        break;
    case 'Update an Employee Manager':
        break;
    case 'View Employees by Manager':
        break;
    case 'View Employees by Department':
        break;
    case 'Delete Department':
        break;
    case 'Delete Roles':
        break;
    case 'Delete Employees':
        break;
    case 'Exit':
        return process.exit();
        }
case 'Update'

        
        break;

    default:
        break;
}
export { pool, connectToDb };
