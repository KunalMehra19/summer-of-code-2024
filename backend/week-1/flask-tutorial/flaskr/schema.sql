-- Drop tables if they exist
DROP TABLE IF EXISTS Transaction;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS InventoryItem;

-- Create InventoryItem table
CREATE TABLE InventoryItem (
  Item_SKU TEXT PRIMARY KEY NOT NULL,
  Item_Name TEXT NOT NULL,
  Item_Description TEXT NOT NULL,
  Item_Price INTEGER NOT NULL,
  Item_Qty INTEGER NOT NULL
);

-- Create Customer table
CREATE TABLE Customer (
  c_ID SERIAL PRIMARY KEY,
  c_name TEXT NOT NULL,
  c_email TEXT UNIQUE NOT NULL,
  c_contact INTEGER UNIQUE NOT NULL
);

-- Create Staff table
CREATE TABLE Staff (
  s_ID SERIAL PRIMARY KEY,
  s_name TEXT NOT NULL,
  s_email TEXT UNIQUE NOT NULL,
  s_isAdmin BOOLEAN NOT NULL,
  s_contact INTEGER UNIQUE NOT NULL
);

-- Create Transaction table
CREATE TABLE Transaction (
  t_ID SERIAL PRIMARY KEY,
  c_ID INTEGER NOT NULL,
  t_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  t_amount INTEGER NOT NULL,
  t_category TEXT NOT NULL,
  FOREIGN KEY (c_ID) REFERENCES Customer (c_ID)
);
