var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");
var cTable = require("console.table");
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});
// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    start();
});
function readItems() {
    console.log("Selecting all items...\n");
    connection.query("SELECT * FROM items", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}
function start(){
    //prints the items for sale and their details
    connection.query('SELECT * FROM Products', function(err, res){
      if(err) throw err;
    
      console.log("Welcome to Bamazon!")
    //   console.log('----------------------------------------------------------------------------------------------------')
    
      for(var i = 0; i<res.length;i++){
        console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        // console.log('--------------------------------------------------------------------------------------------------')
      }
    
      console.log(' ');
      inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: "What is the ID of the product you would like to purchase?",
          validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
              return true;
            } else{
              return false;
            }
          }
        },
        {
          type: "input",
          name: "qty",
          message: "How much would you like to purchase?",
          validate: function(value){
            if(isNaN(value)){
              return false;
            } else{
              return true;
            }
          }
        }
        ]).then(function(ans){
          var whatToBuy = (ans.id)-1;
          var howMuchToBuy = parseInt(ans.qty);
          var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));
    
          //check if quantity is sufficient
          if(res[whatToBuy].StockQuantity >= howMuchToBuy){
            //after purchase, updates quantity in Products
            connection.query("UPDATE Products SET ? WHERE ?", [
            {StockQuantity: (res[whatToBuy].StockQuantity - howMuchToBuy)},
            {ItemID: ans.id}
            ], function(err, result){
                if(err) throw err;
                console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
            });
    
            connection.query("SELECT * FROM Departments", function(err, deptRes){
              if(err) throw err;
              var index;
              for(var i = 0; i < deptRes.length; i++){
                if(deptRes[i].DepartmentName === res[whatToBuy].DepartmentName){
                  index = i;
                }
              }
              
              //updates totalSales in departments table
              connection.query("UPDATE Departments SET ? WHERE ?", [
              {TotalSales: deptRes[index].TotalSales + grandTotal},
              {DepartmentName: res[whatToBuy].DepartmentName}
              ], function(err, deptRes){
                  if(err) throw err;
                  //console.log("Updated Dept Sales.");
              });
            });
    
          } else{
            console.log("Sorry, there's not enough in stock!");
          }
    
          reprompt();
        })
    })
    }
    
    //purchacse more items?
    function reprompt(){
      inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
      }]).then(function(ans){
        if(ans.reply){
          start();
        } else{
          console.log("See you soon!");
        }
      });
    }
    
    start();