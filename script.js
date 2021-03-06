"use strict";

// Data (mimicking API responses)
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

//DOM selectors

const accounts = [account1, account2, account3, account4];

const mainPanel = document.querySelector("main");
const footer = document.querySelector("footer");

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

let loggedAccount;

//Display all the transactions for the logged-in user

const displayTransactions = function (movements) {
  transactions.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const htmlTag = `<div class="transaction">
    <h5 class="${type}">${type.toUpperCase()}</h5>
    <h3 class="transact-amount">${mov}$</h3>
  </div>`;

    transactions.insertAdjacentHTML("afterbegin", htmlTag);
  });
};

//Generate usernames for the accounts
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

//Find and display balance of a logged-in user
const findBalance = function (account) {
  const balance = account.movements.reduce(
    (acc, movement) => acc + movement,
    0
  );
  account.balance = balance;
  currBalance.innerHTML = `${balance}$`;
};

//Calculate and display summary (in, out and interest) of the logged-in user
const calcSummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const int = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);

  IN.textContent = `${incomes}$`;
  OUT.textContent = `${Math.abs(out)}$`;
  interest.textContent = `${int}$`;
};

const updateUI = function (account) {
  displayTransactions(loggedAccount.movements);
  findBalance(loggedAccount);
  calcSummary(loggedAccount);
};

//Event listeners

//Login
document.getElementById("login").addEventListener("click", function () {
  loggedAccount = accounts.find((account) => account.username === user.value);

  if (loggedAccount?.pin === Number(pin.value)) {
    greeting.textContent = `Welcome back, ${
      loggedAccount.owner.split(" ")[0]
    }!`;
    mainPanel.style.opacity = 100; //Display the panel if credentials are correct
    footer.style.opacity = 100;
    updateUI(loggedAccount);
    user.value = pin.value = "";
  }
});

//Transfer feature
confirmTransfer.addEventListener("click", function () {
  const recepient = transferTo.value;
  const amt = Number(amount.value);

  const recepientAccount = accounts.find((acc) => acc.username === recepient);

  if (
    amt > 0 &&
    recepientAccount &&
    recepientAccount?.username !== loggedAccount.username &&
    loggedAccount.balance >= amt
  ) {
    loggedAccount.movements.push(-amt);
    recepientAccount.movements.push(amt);
    updateUI(loggedAccount);
    transferTo.value = amount.value = "";
  }
});

//close account

confirmClosing.addEventListener("click", function () {
  if (
    confirmUser.value === loggedAccount.username &&
    Number(confirmPIN.value) === loggedAccount.pin
  ) {
    const index = accounts.findIndex(
      (account) => account.username === loggedAccount.username
    );

    //Delete the account
    accounts.splice(index, 1);

    //Logout
    mainPanel.style.opacity = 0;
    footer.style.opacity = 0;
    greeting.textContent = "Login to continue";

    confirmUser.value = confirmPIN.value = "";
  }
});

//Request loan

confirmRequest.addEventListener("click", function () {
  const amt = Number(loanAmount.value);

  if (amt > 0 && loggedAccount.movements.some((mov) => mov >= amt * 0.1)) {
    //Credit loan only if there is atleast one deposit which is 0.1 times the requested amount
    loggedAccount.movements.push(amt);
    updateUI(loggedAccount);
  }

  loanAmount.value = "";
});
