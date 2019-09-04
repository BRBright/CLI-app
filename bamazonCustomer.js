var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Camera13!",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId + "\n");
  startEnd();
});
function startEnd() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "search_end",
        message: "Would you like to search for a product?",
        choices: ["Search", "END"]
      }
    ])
    .then(function(answer) {
      if (answer.search_end === "Search") {
        runSearch();
      } else if (answer.search_end === "END") {
        connection.end();
      }
    });
}

function runSearch() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "userItem",
        message: "What is the ID number of the item you are looking for?"
      },
      {
        type: "input",
        name: "userQuantity",
        message: "How many would you like?"
      }
    ])
    .then(function(user) {
      console.log("Selecting product...\n");
      let itemQuery = user.userItem;
      let itemQuantity = user.userQuantity;
      connection.query(
        "SELECT * FROM products WHERE id=?",
        [itemQuery],
        function(err, res) {
          if (err) throw err;

          for (var i = 0; i < res.length; i++) {
            if (itemQuantity <= res[i].stock_quantity) {
              console.log(
                res[i].id +
                  ") " +
                  res[i].product_name +
                  " | " +
                  res[i].department_name +
                  " | " +
                  res[i].price +
                  " | " +
                  res[i].stock_quantity
              );
            } else {
              console.log("Insufficient quantity!");
            }
          }
          startEnd();
          connection.end();
        }
      );
    });
}
