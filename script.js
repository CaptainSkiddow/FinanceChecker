const incomeList = document.querySelector("#income_list");
const expenseList = document.querySelector("#expense_list");
const assetList = document.querySelector("#asset_list");
const liabilityList = document.querySelector("#liability_list");

const flowItems = [
  { description: "Car", amount: "100", tag: "negative" },
  { description: "House", amount: "900", tag: "negative" },
  { description: "Salary", amount: "1200", tag: "positive" },
  { description: "Toeslagen", amount: "100", tag: "positive" },
  { description: "Photo gig", amount: "650", tag: "positive" },
];

const balanceItems = [
  { description: "Cash", amount: "1000", tag: "asset" },
  { description: "Loan", amount: "500", tag: "liability" },
];

function load_statement() {
  // Remove all the items from the array, to be sure we start fresh
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  //Loop through the flowItems array and create a list item for each
  flowItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: $${item.amount}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", () => {
      flowItems.splice(index, 1);
      load_statement();
      totalStatement();
    });

    li.appendChild(deleteButton);

    if (item.tag === "positive") {
      incomeList.appendChild(li);
    } else if (item.tag === "negative") {
      expenseList.appendChild(li);
    }
  });
}

// Basicly the same function as load_statement, but for the balance array
function load_balance() {
  balanceItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: $${item.amount}`;

    if (item.tag === "asset") {
      assetList.appendChild(li);
    } else if (item.tag === "liability") {
      liabilityList.appendChild(li);
    }
  });
}

// This function does the actual math to provide a total number.
function totalStatement() {
  const positiveTotal = flowItems
    .filter((item) => item.tag === "positive")
    .reduce((total, item) => total + parseInt(item.amount, 10), 0);

  const negativeTotal = flowItems
    .filter((item) => item.tag === "negative")
    .reduce((total, item) => total + parseInt(item.amount, 10), 0);

  const netTotal = positiveTotal - negativeTotal;

  //this makes the bars have colors depending on being a - or a + total.
  if (netTotal >= 0) {
    document.querySelector("#statement_balance").style.color = "green";
  } else {
    document.querySelector("#statement_balance").style.color = "red";
  }
  document.querySelector("#statement_balance").textContent = `$${netTotal}`;
}

//function that is called when form is submitted to add items to the list.
function addToStatement() {
  const description = document.querySelector("#description").value;
  const amount = document.querySelector("#amount").value;
  const tag = document.querySelector("#tag").value;

  if (description && amount) {
    flowItems.push({ description, amount, tag });
    load_statement();
    totalStatement();
  }
}
//addform function
document.querySelector("#addForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const description = document.querySelector("#description").value;
  const amount = document.querySelector("#amount").value;
  const tag = document.querySelector("#tag").value;

  if (description && amount && tag) {
    flowItems.push({ description, amount: parseInt(amount, 10), tag });
    incomeList.innerHTML = "";
    expenseList.innerHTML = "";
    load_statement();
    totalStatement();

    document.querySelector("#description").value = "";
    document.querySelector("#amount").value = "";
    document.querySelector("#tag").value = "positive";
  }
});

load_statement();
load_balance();

console.log(flowItems);
totalStatement();
