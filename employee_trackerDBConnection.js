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
  connection.query(
    "SELECT dept_name, first_name, last_name FROM department INNER JOIN employee WHERE department.id = employee.id",
    (err, res) => {
      if (err) throw err;

      const table = cTable.getTable(res);
      console.log(table);

      connection.end();
    }
  );
}

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  queryEmployees();
});
