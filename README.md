# Bamazon-Homework

Welcome to Bamazon!!!!

Bamazon is a CLI application that allows the user to shop for products in store.

Bamazon CLI App is developed using Node.js and mySQL.

* customerview.sql contains sql statements for database and table creation.
* supervisorview.sql contains sql statements for table creation and creating data for table.
* bamazoncustomer.js contains logic for customer view.
* bamazonManager.js  contains logic for Manager view.
* bamazonsupervisor.js contains logic for Supervisor view.

## Bamazon has 3 interfaces:

### 1. Customer Interface.

Customer interface allows user to buy items from Bamazon.

![GitHub Logo](/images/IDquestion.PNG)

![GitHub Logo](/images/Totalcost.PNG)

If Customer orders quantity greater than the store currently holds he gets a message about insufficient quantity.

![GitHub Logo](/images/InsufficientQuantity.PNG)


### 2. Manager Interface.

The Manager View allows manager to keep track of available inventory and modify as new inventory or produt arrives.
	
Following  are the options available to the Manager:

![GitHub Logo](/images/bamazonmanageroptions.PNG)

* "View Products for Sale":

![GitHub Logo](/images/managerviewsale.PNG)

* "View Low Inventory"(any items with stock quantity below 5):

![GitHub Logo](/images/managerlowinventory.PNG)

* "Add to Inventory":

![GitHub Logo](/images/addInventory.PNG)

* "Add New Product":

![GitHub Logo](/images/addnewproduct.PNG)


### 2. Supervisor Interface.

The Supervisor Interface allows supervisor with two options:

* "View Product Sales by Department":

![GitHub Logo](/images/supervisorsalesview.PNG)


* "Create New Department"

![GitHub Logo](/images/supervisoradd.PNG)

	
