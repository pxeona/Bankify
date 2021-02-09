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

const displayTransactions = function (movements) {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const htmlTag = `<div class="transaction">
    <h5 class="${type}">${type.toUpperCase()}</h5>
    <h3 class="transact-amount">${mov}$</h3>
  </div>`;
    transactions.insertAdjacentHTML("afterbegin", htmlTag);
  });
};

displayTransactions(account1.movements);

const createUserNames = (accounts) => {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserNames(accounts);

const findBalance = function (movements) {
  const balance = movements.reduce((acc, movement) => acc + movement, 0);
  currBalance.innerHTML = `${balance}$`;
};

findBalance(account1.movements);

const calcSummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const int = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * 1.2) / 100)
    .reduce((acc, mov) => acc + mov, 0);

  IN.textContent = `${incomes}$`;
  OUT.textContent = `${Math.abs(out)}$`;
  interest.textContent = `${int}$`;
};

calcSummary(account1.movements);
