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

	supervisorChoices();
});


function supervisorChoices(){
	inquirer
	.prompt({
		name:"supervisorchoose",
		type:"list",
		message:"what would you like to do?",
		choices:[
		"View Product Sales by Department",
    	"Create New Department"
		]


	}).then(function(answer){
		//console.log(answer.supervisorchoose);
		switch(answer.supervisorchoose){
			case "View Product Sales by Department":
				productSales();
				break;

			case "Create New Department":
				createDept();
				break;
		}
	})
	
}

function productSales(){
	var table = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
	, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
	, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
	, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});
		var salesSQL="select a.department_id,a.department_name,a.over_head_costs,sum(b.product_sales) as Product_sales, (sum(b.product_sales)-a.over_head_costs) as Total_Profit from departments a join products b on a.department_name = b.department_name group by b.department_name";
		connection.query(salesSQL,function(err,res){
			if (err) throw err;
			console.log("Sales by Department")

			table.push(["Department ID","Department Name","Over head Costs","Product Sales", "Total Profit"]);
			for (var i = 0; i < res.length; i++) {

				table.push([res[i].department_id,res[i].department_name,res[i].over_head_costs,res[i].Product_sales,res[i].Total_Profit]);
			}
			console.log(table.toString());
			connection.end();
		})


}


function createDept(){
	var table = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
	, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
	, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
	, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

	inquirer
	.prompt([
	{
		name:"department_name",
		type:"input",
		message:"Please enter new department name ?"

	},{
		name:"overheadcost",
		type:"input",
		message:"Please enter over head cost for department?"

	}]).then(function(answer){
		var sql = `Insert into departments (department_name,over_head_costs) values('${answer.department_name}','${answer.overheadcost}')`;
		
		connection.query(sql,function(err,result){
			if (err) throw err;

			connection.query("select * from departments",function(err,results){	
				if(err) throw err;
			table.push(['Department ID','Department name','Over Head Cost'])

			for (var i = 0; i < results.length; i++) {
				table.push([results[i].department_id,results[i].department_name,results[i].over_head_costs]);
			}
			console.log(table.toString());
			
		})
				connection.end();
	})
	
})
}