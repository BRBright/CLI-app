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
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "End"
        ]
      }
    ])
    .then(function(answer) {
      if (answer.search_end === "View Products for Sale") {
        runSearch();
      } else if (answer.search_end === "View Low Inventory") {
        viewLowInventory();
      } else if (answer.search_end === "Add to Inventory") {
        addInventory();
      } else if (answer.search_end === "Add New Product") {
        addNewProduct();
      } else if (answer.search_end === "End") {
        connection.end();
      }
    });
}
function runSearch() {
  console.log("Selecting product...\n");

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
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
    }
    console.log("-----------------------------------------");
    startEnd();
  });
}

function viewLowInventory() {
  console.log("Finding low inventory products...\n");

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity <= 5) {
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
      }
    }
    console.log("-----------------------------------------");
    startEnd();
  });
}

function addInventory() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item",
        message: "What item would you like to update?"
      },
      {
        type: "number",
        name: "quantity",
        message: "What would you like to change the quantity to?"
      }
    ])
    .then(function(user) {
      console.log("Updating quantities...\n");
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: user.quantity
          },
          {
            id: user.item
          }
        ],
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " Product updated!\n");
          console.log("-----------------------------------------");
          startEnd();
        }
      );
    });
}
