const mysql = require("mysql");
const cTable = require("console.table");

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

// function addRole(employee_first, employee_last, role) {
//   //store inputs for string concatenation
//   let employeeFirst = employee_first;
//   let employeeLast = employee_last;
//   let desiredRole = role;
//   let employeeID;

//   //Find employee ID
//   let employeeQuery = `SELECT id FROM employee where first_name = "${employeeFirst}" AND last_name = "${employeeLast}"`;

//   connection.query(employeeQuery, (err, res) => {
//     if (err) throw err;
//     console.log(res[0].id);
//     employeeID = res[0].id;
//   });
//   console.log(employeeID);
//   connection.end();
// }

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
});

queryEmployees();
