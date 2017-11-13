var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"Bootcamp123",
	database:"bamazon_db"

})

connection.connect(function(err){
	if (err) throw err;

	 displayProduct()
		//askCustomer();



});

function displayProduct(){
		connection.query("select item_id,product_name,price from Products",function(err,results){
		if (err) throw err;
		console.log("Item_ID | Product | Price \n");

		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price +"\n")
		}
	})
		connection.end()
}

function askCustomer(){
	inquirer.prompt([{
		name:"item_id",
		type:"input",
		message:"Please enter ID of product you want to buy?"

	},
	{
		name:"units",
		type:"input",
		message:"how many units do you want to order?"

	}]).then(function(answer){
		console.log(answer.item_id);
		console.log(answer.units);
	})
}