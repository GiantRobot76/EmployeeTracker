const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const { restoreDefaultPrompts } = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "MonteCarlo314",
  database: "employee_trackerDB",
});

//Generates Overall Summary Table of all Employees, Roles, and Departments
function queryEmployees() {
  //Chained Inner Join of all 3 Tables on appropriate foreign keys
  connection.query(
    "SELECT first_name, last_name, title, MANAGER_ID, salary, dept_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;",
    (err, res) => {
      if (err) throw err;

      const table = cTable.getTable(res);
      console.log(table);

      connection.end();
    }
  );
}

//functions that add new departments, roles, and employees
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you wish to add?",
        name: "newDepartment",
      },
    ])
    .then((response) => {
      let newDept = response.newDepartment;
      connection.query(
        `INSERT INTO department (dept_name) VALUES ("${newDept}")`,
        (err, res) => {
          if (err) throw err;
          console.log("New Department Added!");
          connection.end();
        }
      );
    });
}

function addRole() {
  //retrieve list of departments from DB
  connection.query("SELECT dept_name from department", (err, res) => {
    if (err) throw err;

    //if no error, use results to prompt user for input
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role that you would like to add?",
          name: "newRole",
        },
        {
          type: "input",
          message: "What is the salary of the new position?",
          name: "newSalary",
        },
        {
          type: "rawlist",
          message: "To Which Department Should this Role be Added?",
          choices() {
            const deptArray = [];
            res.forEach(({ dept_name }) => {
              deptArray.push(dept_name);
            });
            return deptArray;
          },

          name: "deptAdd",
        },
      ])
      .then((response) => {
        console.log(response);
        //query DB for department ID
        connection.query(
          `SELECT id FROM department WHERE dept_name ="${response.deptAdd}"`,
          (err, res) => {
            if (err) throw err;
            let deptID = res[0].id;
            //insert new role to DB based on user input
            connection.query(
              `INSERT INTO role (title, salary, department_id) VALUES ("${response.newRole}", ${response.newSalary}, ${deptID})`,
              (err, res) => {
                if (err) throw err;
                console.log("New Role Added!");
                mainMenu();
              }
            );
          }
        );
      });
  });
}

function mainMenu() {
  connection.end();
}
connection.connect((err) => {
  if (err) throw err;
  // console.log(`connected as id ${connection.threadId}`);
});

addRole();
