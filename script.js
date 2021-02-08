"use strict";

// Data
const account1 = {
  owner: "Pravin Xeona",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Cairn Ahern",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const greeting = document.querySelector("#greeting");
const user = document.querySelector("#user");
const pin = document.querySelector("#pin");
const login = document.querySelector("#login");

const currBalance = document.querySelector("#currBalance");
const transactions = document.querySelector("#transactions");

const features = document.querySelector("#features");

const transferTo = document.querySelector("#transferTo");
const amount = document.querySelector("#amount");
const confirmTransfer = document.querySelector("#confirmTransfer");

const loanAmount = document.querySelector("#loanAmount");
const confirmRequest = document.querySelector("#confirmRequest");

const confirmUser = document.querySelector("#confirmUser");
const confirmPIN = document.querySelector("#confirmPIN");
const confirmClosing = document.querySelector("#confirmClosing");

const IN = document.querySelector("#IN");
const OUT = document.querySelector("#OUT");
const interest = document.querySelector("#interest");

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
