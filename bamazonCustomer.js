  const mysql = require("mysql");
  const inquirer = require("inquirer");
  const consoleTable = require("console.table");


  const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "root",
      database: "bamazon"
  });

  connection.connect(function (err) {
      if (err) throw err;
      console.log(connection);
      console.log("connected as id " + connection.threadId);
      display();
      connection.end();
  });

  const display = function () {
      connection.query("SELECT * FROM products", function (err, results) {
          if (err) throw err;
          console.table(results);
          run();
      })
  };

  let run = function () {
      // query database for all products available for purchase
      connection.query("SELECT * FROM products", function (err, results) {
          if (err) throw err;
          // prompt user which item they would like to purchase
          inquirer.prompt([{
                  name: "product",
                  type: "list",
                  choices: function () {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].product_name);
                      }
                      return choiceArray;
                  },
                  message: "What product would you like to buy?"
              },
              {
                  name: "amount",
                  type: "input",
                  message: "How many would you like?"
              }
          ]).then(function (answer) {
              let chosenProduct;
              for (let i = 0; i < results.length; i++) {
                  if (answer.product === results[i].product_name) {
                      chosenProduct = results[i];
                  }
              }
              checkOrder(chosenProduct, answer);
          });
      });
  }

  let checkOrder = function (chosenProduct, answer) {

      if (chosenProduct.stock_quantity > answer.amount) {
          console.log(answer)
          connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${answer.amount} WHERE item_id = ${chosenProduct.item_id}`);
          // {
          //     // stock_quantity: chosenProduct - parseInt(answer.amount)

          // },
          // {
          //     id: chosenProduct.id

          console.log("\n\n");
          console.log("Product purchased successfully!");
          console.log("Purchase Summary");
          console.log("Item Name: " + chosenProduct.product_name);
          console.log("Item Count: " + parseInt(answer.amount));
          console.log("Total: " + "$" + (chosenProduct.price * parseInt(answer.amount)));
          console.log("\n\n");
          // display();
          // run();

      } else {
          console.log("Insuficient quantity! Please pick another item.");
          // display();
          // run();
      }
  }




  display();
  run();