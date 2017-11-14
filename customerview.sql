Create Database Bamazon_db;

use Bamazon_db;

Create Table Products (
	item_id integer(10) auto_increment not Null,
    product_name varchar(200) null,
    department_name varchar(200) null,
    price decimal(10,2) null,
    stock_quantity integer(10) null,
    primary key (item_id)
);

INSERT INTO Products
    (product_name,department_name,price,stock_quantity)
VALUES
   ("L Section Sofa", "Furniture", 1999.99, 100),
    ("Papasan Chair", "Furniture", 69.99, 1000),
    ("Lounge Chair", "Furniture", 799.99, 2000),
    ("Dinner Set", "Cookware", 579.99, 2000),
    ("Glassware", "Dining", 34.99, 5000),
    ("Comforter", "Bedding", 57.99, 3500),
    ("Plush Blanket", "Bedding", 19.99, 4000),
    ("Chocolates", "Desserts", 19.99, 4000),
     ("Pudding", "Desserts", 29.99, 6000),
     ("Muffins", "Desserts", 6.99, 14000);
     
 select * from Products;    