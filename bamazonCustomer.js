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
      //   connection.end();
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
      connection.query('SELECT * FROM products', function (err, results) {
          if (err) throw err;
          // prompt user which item they would like to purchase
          inquirer.prompt([{
                  name: "item_id",
                  type: "list",
                  choices: function () {
                      let choiceArray = [];
                      for (let i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].item_id);
                      }
                      return choiceArray;
                  },
                  message: "What product (ID) would you like to buy?"
              },
              {
                  name: "amount",
                  type: "input",
                  message: "How many would you like?"
              }
          ]).then(function (user) {
              for (let i = 0; i < results.length; i++) {
                  if (user.item_id === results[i].item_id) {
                      const userId = user.item_id;
                      const userAmount = user.amount;
                      checkOrder(userId, userAmount);
                  }
              }
          });
      });
  }

  let checkOrder = function (userId, userAmount) {
      connection.query(`SELECT stock_quantity,product_name,price FROM products WHERE item_id = ${userId}`, function (err, answer) {
          if (err) throw err;
          console.log(userAmount,answer);
          for (let i=0; i<answer.length; i++) {
          if (userAmount < answer[i].stock_quantity) {

              connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${userAmount} WHERE item_id = ${userId}`);
              // {
              //     // stock_quantity: chosenProduct - parseInt(answer.amount)

              // },
              // {
              //     id: chosenProduct.id

              console.log("\n\n");
              console.log("Product purchased successfully!");
              console.log("Purchase Summary");
              console.log("Item Name: " + answer[i].product_name);
              console.log("Item Count: " + parseInt(userAmount));
              console.log("Total: " + "$" + (answer[i].price * parseInt(userAmount)));
              console.log("\n\n");
              // display();
              // run();

          } else {
              console.log("Insuficient quantity! Please pick another item.");
              // display();
              // run();
          }
        }
        connection.end();
      })
  }




  //   display();
  //   run();