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
	if(err) throw err;

	managerChoices()
});

function managerChoices(){
	inquirer
	.prompt({
		name:"managerchoose",
		type:"list",
		message:"what would you like to do?",
		choices:[
		"View Products for Sale",
    	"View Low Inventory",
    	"Add to Inventory",
    	"Add New Product"
		]


	}).then(function(answer){
		//console.log(answer.managerchoose);
		switch(answer.managerchoose){
			case "View Products for Sale":
				productSale();
				break;

			case "View Low Inventory":
				productLow();
				break;

			case "Add to Inventory":
				addInventory();
				break;

			case "Add New Product":
				addProduct();
				break;	
		}
	})
	//connection.end();
}

function productSale(){
	var saleTable = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
	, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
	, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
	, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});
	connection.query("select item_id,product_name,price,stock_quantity from Products",function(err,results){
		if (err) throw err;

		saleTable.push(['Item ID','Product Name','Unit Price','Available Stock'])
		console.log("Existing Products in store \n");

		
		for (var i = 0; i < results.length; i++) {
			saleTable.push([results[i].item_id,results[i].product_name,results[i].price,results[i].stock_quantity])
			//console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price + " | " + results[i].stock_quantity + "\n")
		}
		console.log(saleTable.toString());
		managerChoices();
	});
	//connection.end();
}

function productLow(){
	var productLowTable = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
	, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
	, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
	, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});
	connection.query("select item_id,product_name from Products where stock_quantity < 5",function(err,results){
			if (err) throw err;

			console.log("Items low on inventory:\n");
			//console.log("Item_ID | Product \n")
			productLowTable.push(['Item ID','Product Name']);
			for (var i = 0; i < results.length; i++) {
			//console.log(results[i].item_id + " | " + results[i].product_name + "\n")
			productLowTable.push([results[i].item_id,results[i].product_name]);
		}
		console.log(productLowTable.toString());
		managerChoices();
	});
	//connection.end();

}

function addInventory(){
	var addInventoryTable = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
	, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
	, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
	, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

	inquirer
	.prompt([{
		name:"item_id",
		type:"input",
		message:"Please enter ID of product you want to add inventory to?"

	},
	{
		name:"units",
		type:"input",
		message:"how many units do you want to add to inventory?"

	}]).then(function(answer){

		// console.log(answer.item_id);
		// console.log(answer.units);
			var sql=`update Products set stock_quantity = stock_quantity + ${answer.units}  where item_id=  ?`
		connection.query(sql,[answer.item_id], function(err,results){
			if (err) throw err;

				//console.log(results.affectedRows);
				//console.log(results);
				connection.query(`select * from Products where item_id = ${answer.item_id}`, function(err,results){
					if(err) throw err;
					addInventoryTable.push(['Item ID','Product Name','Unit Price','Stock Quantity'])
				//console.log(results[0].item_id + " | " + results[0].product_name + " | " + results[0].price + "|" + results[0].stock_quantity );
					addInventoryTable.push([results[0].item_id,results[0].product_name,results[0].price,results[0].stock_quantity]);
					console.log(addInventoryTable.toString());
					managerChoices();
				})
			
		})
	})
}

function addProduct(){
	var addProductTable = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
	, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
	, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
	, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

	inquirer
	.prompt([{
		name:"product_name",
		type:"input",
		message:"Please enter name of the product?"

	},
	{
		name:"department_name",
		type:"input",
		message:"Please enter department in which you want to add product?"

	},
	{
		name:"price",
		type:"input",
		message:"Please Enter price of sale for the item?"

	},{
		name:"quantity",
		type:"input",
		message:"how many units of the product would you like to add?"

	}]).then(function(answer){
		// console.log(answer.product_name);
		// console.log(answer.department_name);
		// console.log(answer.price);
		// console.log(answer.quantity);
			var sql = `Insert into Products (product_name,department_name,price,stock_quantity) Values('${answer.product_name}','${answer.department_name}','${answer.price}','${answer.quantity}')`;
			connection.query(sql,function(err,results){
					if (err) throw err;

						// console.log(results.affectedRows);
							connection.query("select * from Products",function(err,results){
									addProductTable.push(['Item ID','Product Name','Department Name','Unit Price','Stock Quantity'])
								for (var i = 0; i < results.length; i++) {
									//console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity + "\n")
									addProductTable.push([results[i].item_id,results[i].product_name,results[i].department_name,results[i].price,results[i].stock_quantity]);
									}
									console.log(addProductTable.toString());
									managerChoices();
							})


			})

	});

}