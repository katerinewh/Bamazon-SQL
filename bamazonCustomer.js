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
function start() {
    inquirer.prompt([
        {
            name: "startAnswer",
            message: "Do you want to 'post' and item or 'bid' on an item?"
        }
    ]).then(function (answers) {
        if (answers.startAnswer === "post") {
            console.log("Inserting a new item...\n");
            inquirer.prompt([
            {
            name: "postItem",
            message: "What would you like to post?"}
            then(var query = connection.query(
                        "INSERT INTO item SET ?",
            }
            ])
            function(err, res) {
                console.log(res.affectedRows + " product inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                updateProduct();
            }
            );

    // logs the actual query being run
    console.log(query.sql);




    connection.query
} else if (answers.startAnswer === "bid") {
    // console.log("Code for bidding on an item!")
    connection.query("SELECT * FROM items", function (err, res) {
        if (err) throw err;
        console.log("-------------")
        console.log("Title: " + res[0].title);
        console.log("Department: " + res[0].department);
        console.log("Price: " + res[0].price);
        console.log("-------------")
        connection.end();
    });

}

    })
}

