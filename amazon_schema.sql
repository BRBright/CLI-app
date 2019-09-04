DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    id INTEGER
        NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (30),
    department_name VARCHAR
    (30),
    price DECIMAL
    (10, 2),
    stock_quantity INTEGER
    (10),
    PRIMARY KEY
    (id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("tv", "electronics", 1600, 100);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("computer", "electronics", 3000, 100);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("soda", "food", 3.99, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("ball", "sports", 5.99, 35);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("headphones", "electronics", 100, 20);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("nintindow switch", "electronics", 199, 10000);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("fire emblem", "video games", 60, 100000000);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("steak", "food", 16.99, 1);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("BBQ", "outdoor", 1200, 10);