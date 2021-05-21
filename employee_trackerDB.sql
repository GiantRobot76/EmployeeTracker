DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
id INTEGER AUTO_INCREMENT,
dept_name VARCHAR(30),
PRIMARY KEY(id)
);

CREATE TABLE role(
id INTEGER AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER,
PRIMARY KEY(id)
);

CREATE TABLE employee(
id INTEGER AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
MANAGER_ID INTEGER,
PRIMARY KEY(id)

); 

