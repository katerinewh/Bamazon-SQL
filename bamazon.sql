DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

SELECT * FROM products;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR (100) NULL, 
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bacon-Flavored Body Wash, 72oz.", "Health & Beauty", 25.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mr. Bacon's Glacier-Scented Beard Balm", "Men's Grooming", 28.32, 68);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Emergency Mustache kit", "Health & Beauty", 19.99, 900);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flavored Lickable Wallpaper, 100 sq.ft ", "Home Improvement", 172.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Picnick Pants","Clothing",22.50, 65);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("25 Placenta Recipies", "Literature-Cooking", 19.50, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canned Unicorn Meat","Grocery", 9.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shakesperean Insult Bandages","Health & Beauty", 5.99, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crafting with Cat Hair","Literature", 12.48, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Emergency Beard Guards", "Safety", 7.78, 46);