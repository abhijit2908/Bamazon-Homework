--Create Database Bamazon_db;

use Bamazon_db;

Alter Table Products
ADD Product_Sales decimal(10,2) default 0.00;


Create Table departments (
	department_id integer(10) auto_increment not Null,
    department_name varchar(200) null,
    over_head_costs decimal(10,2) null,
    primary key (department_id)
);

INSERT INTO departments
    (department_name,over_head_costs)
VALUES
   ("Furniture", 2000.00),
    ("Cookware", 600.00),
    ("Dining", 2000.00),
    ("Bedding", 1000.00),
    ("Desserts", 200.00),
     ("Electrical", 500.00),
     ("Clothes", 300.00),
     ("Jewelery", 300.00)
     
 select * from departments;    