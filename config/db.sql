-- Active: 1755252362274@@127.0.0.1@3306@cheap_fuel
CREATE DATABASE cheap_fuel

USE cheap_fuel

SELECT DATABASE()

CREATE TABLE fuel_types(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
CREATE TABLE gas_station(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE gas_station_branch(
    id int AUTO_INCREMENT PRIMARY KEY,
    gas_station_id int NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    FOREIGN KEY(gas_station_id) 
    REFERENCES gas_station(id)
);
CREATE TABLE gas_station_fuel_type(
    id int AUTO_INCREMENT PRIMARY KEY,
    gas_station_branch_id int NOT NULL,
    fuel_type_id int NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    is_exists BOOLEAN NOT NULL,
    FOREIGN KEY(gas_station_branch_id) 
    REFERENCES gas_station_branch(id),
    FOREIGN KEY(fuel_type_id) 
    REFERENCES fuel_types(id)
);
show tables

SELECT gsb.name, gsb.address FROM  gas_station_branch gsb
LEFT JOIN gas_station gs on gs.id=gsb.gas_station_id
WHERE gs.name LIKE "%Gazprom%"


SELECT 
  b.name AS branch_name,
  b.address,
  f.name AS fuel_name,
  gst.is_exists
FROM gas_station_branch b
LEFT JOIN gas_station_fuel_type gst 
  ON gst.gas_station_branch_id = b.id
LEFT JOIN fuel_types f 
  ON f.id = gst.fuel_type_id
WHERE gst.is_exists=TRUE AND f.name LIKE ?;
