drop database if exists financialplannerdb cascade;
create database financialplannerdb;
use financialplannerdb;

-- Create table for BankAccountTypes
CREATE TABLE BankAccountTypes (
    ID INT PRIMARY KEY,
    Name VARCHAR(50)
);

-- Create table for BankAccountStatuses
CREATE TABLE BankAccountStatuses (
    ID INT PRIMARY KEY,
    Name VARCHAR(50)
);

-- Create table for Banks
CREATE TABLE Banks (
    ID VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(100)
);

-- Create table for Users
CREATE TABLE Users (
    ID VARCHAR(50) PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Birthdate DATE,
    Email VARCHAR(100),
    PhoneNumber VARCHAR(20)
);

-- Create table for Messages
CREATE TABLE Messages (
    ID INT PRIMARY KEY,
    UserID VARCHAR(50),
    Content STRING,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);


-- Create table for TransactionTypes
CREATE TABLE TransactionTypes (
    ID INT PRIMARY KEY,
    Name VARCHAR(50)
);

-- Create table for Currencies
CREATE TABLE Currencies (
    ID INT PRIMARY KEY,
    Symbol VARCHAR(10),
    Description VARCHAR(100)
);

-- Create table for TransactionStatuses
CREATE TABLE TransactionStatuses (
    ID INT PRIMARY KEY,
    Name VARCHAR(50)
);

-- Create table for Transactions Categories
CREATE TABLE TransactionCategories (
    ID INT PRIMARY KEY,
    Name VARCHAR(50)
);

-- Create table for Transactions
CREATE TABLE Transactions (
    ID VARCHAR(50) PRIMARY KEY,
    UserID VARCHAR(50),
    TransactionTypeID INT,
    CurrencyID INT,
    TransactionStatusID INT,
    TransactionCategoryID INT,
    Amount DECIMAL(15, 2),
    DateTime TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (TransactionTypeID) REFERENCES TransactionTypes(ID),
    FOREIGN KEY (CurrencyID) REFERENCES Currencies(ID),
    FOREIGN KEY (TransactionStatusID) REFERENCES TransactionStatuses(ID),
    FOREIGN KEY (TransactionCategoryID) REFERENCES TransactionCategories(ID)
);

-- Create table for BankAccounts
CREATE TABLE BankAccounts (
    ID VARCHAR(50) PRIMARY KEY,
    BankID VARCHAR(50),
    UserID VARCHAR(50),
    BankAccountTypeID INT,
    StatusID INT,
    FOREIGN KEY (BankID) REFERENCES Banks(ID),
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (BankAccountTypeID) REFERENCES BankAccountTypes(ID),
    FOREIGN KEY (StatusID) REFERENCES BankAccountStatuses(ID)
);


-- Create table for AccountBalances
CREATE TABLE AccountBalances (
    ID INT PRIMARY KEY,
    BankAccountID VARCHAR(50),
    CurrencyID INT,
    Amount DECIMAL(15, 2),
    DateTime TIMESTAMP,
    FOREIGN KEY (BankAccountID) REFERENCES BankAccounts(ID),
    FOREIGN KEY (CurrencyID) REFERENCES Currencies(ID)
);

-- Create table for SecurityTypes
CREATE TABLE SecurityTypes (
    ID INT PRIMARY KEY,
    Name VARCHAR(50)
);

-- Create table for Secirity Assets
CREATE TABLE SecurityAssets (
    ID VARCHAR(50) PRIMARY KEY,
    UserID VARCHAR(50),
    BankAccountID VARCHAR(50),
    Symbol VARCHAR(50),
    Quantity DECIMAL(15, 2),
    SecurityTypeID INT,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (SecurityTypeID) REFERENCES SecurityTypes(ID),
    FOREIGN KEY (BankAccountID) REFERENCES BankAccounts(ID)
);