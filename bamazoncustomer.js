var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


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
	var table = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
	, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
	, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
	, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});
	connection.query("select item_id,product_name,price from Products",function(err,results){
		if (err) throw err;
		//console.log("Item_ID | Product | Price \n");


		table.push(['Item_ID', 'Product', 'Price']);
		//console.log(table.toString());

		for (var i = 0; i < results.length; i++) {
	//console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price +"\n")
	table.push([results[i].item_id,results[i].product_name,results[i].price]);

}
console.log(table.toString());
askCustomer();
})

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
		//console.log(answer.item_id);
		//console.log(answer.units);

		var sql = "select stock_quantity from products where item_id = ?";
		connection.query(sql,[answer.item_id],function(err,results){
			if (err) throw err;
			var stockCount = results[0].stock_quantity;
						//console.log(results[0].stock_quantity);
						//console.log(stockCount);

						if(stockCount < answer.units){
							console.log("\nInsufficient Quantity.Please try once we restock.");
							connection.end();
						}

						else{
							updateQuantities(answer.units,answer.item_id);
						}

					})
	})

	//connection.end()
}

function updateQuantities(sQuantity,ID){

var cost_Table = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
	, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
	, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
	, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

	var updateQ = `update Products set stock_quantity = stock_quantity - ${sQuantity} where item_id = ${ID}`;
	connection.query(updateQ,function(err,results){
		//console.log("updated Quantity" + results.affectedRows);
		//console.log(results);


		var showUpdate = `select * from Products where item_id = ${ID}`;
		connection.query(showUpdate,function(err,results){
			if (err) throw err;
			cost_Table.push(["Item ID","Product Name","Unit Price","Quantity","Total Cost"]);
			//console.log(results[0].item_id + " | " + results[0].product_name + " | " + results[0].price + "|" + results[0].stock_quantity );
			var stockName = results[0].product_name;
			var stockPrice = results[0].price;
			var totalPrice = parseFloat(sQuantity *stockPrice).toFixed(2);
			console.log("Your total cost for your " + stockName + " is $" + totalPrice);
				console.log(totalPrice);
				console.log(ID);
				var updateSales = `update Products set Product_Sales = Product_Sales + ${totalPrice} where item_id = ${ID}`;
				connection.query(updateSales,function(err,results){
				if(err) throw err;
				// 	console.log("updating done");
				})
				cost_Table.push([results[0].item_id,results[0].product_name,results[0].price,sQuantity,totalPrice]);
			console.log(cost_Table.toString());
				connection.end();
		})

		
	})	

}