DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon; 

USE bamazon;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(20),
department_name VARCHAR(20),
price DECIMAL (3, 2) DEFAULT 0,
stock_quantity INTEGER,
PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "recovery heart", "health", 10.00, 500);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "green potion", "health", 30.00, 300);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "red potion", "health", 30.00, 300);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "deku seeds (30)", "ammo", 30.00, 450);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "arrows (30)", "ammo", 60.00, 600);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "arrows (50)", "ammo", 90.00, 300);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "deku sheild", "defense", 40.00, 60);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "hylian sheild", "defense", 80.00, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "zora tunic", "clothing", 300.00, 1);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "goron tunic", "clothing", 300.00, 1);


