const incomeList = document.querySelector('#income_list');
const expenseList = document.querySelector('#expense_list');
const assetList = document.querySelector('#asset_list');
const liabilityList = document.querySelector('#liability_list');




const flowItems = [
    { description: 'Car', amount: '100', tag: 'negative' },
    { description: 'House', amount: '900', tag: 'negative' },
    { description: 'Salary', amount: '1200', tag: 'positive' },
    { description: 'Toeslagen', amount: '100', tag: 'positive' },
    { description: 'Photo gig', amount: '650', tag: 'positive' },
];

const balanceItems = [
    { description: 'Cash', amount: '1000', tag: 'asset' },
    { description: 'Loan', amount: '500', tag: 'liability' }
]


function load_statement() {
    // Clear the existing lists to avoid duplicates
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';

    // Append items to the appropriate lists
    flowItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.description}: $${item.amount}`;

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => {
            // Remove the item from the flowItems array
            flowItems.splice(index, 1);
            // Reload the statement and update totals
            load_statement();
            totalStatement();
        });

        // Append the delete button to the list item
        li.appendChild(deleteButton);

        // Append the list item to the appropriate list
        if (item.tag === 'positive') {
            incomeList.appendChild(li);
        } else if (item.tag === 'negative') {
            expenseList.appendChild(li);
        }
    });
}


function load_balance() {
    balanceItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.description}: $${item.amount}`;

        if (item.tag === 'asset') {
            assetList.appendChild(li);
        } else if (item.tag === 'liability') {
            liabilityList.appendChild(li);
        }
    })
};


function totalStatement() {
    const positiveTotal = flowItems
        .filter(item => item.tag === 'positive')
        .reduce((total, item) => total + parseInt(item.amount, 10), 0);

    const negativeTotal = flowItems
        .filter(item => item.tag === 'negative')
        .reduce((total, item) => total + parseInt(item.amount, 10), 0);

    const netTotal = positiveTotal - negativeTotal;

    if (netTotal >= 0) {
        document.querySelector('#statement_balance').style.color = 'green';
    } else {
        document.querySelector('#statement_balance').style.color = 'red';
    }
    document.querySelector('#statement_balance').textContent = `$${netTotal}`;
}

function addToStatement() {
    const description = document.querySelector('#description').value;
    const amount = document.querySelector('#amount').value;
    const tag = document.querySelector('#tag').value;

    if (description && amount) {
        flowItems.push({ description, amount, tag });
        load_statement();
        totalStatement();
    }
}

// Add event listener for the form submission
document.querySelector('#addForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get values from the form
    const description = document.querySelector('#description').value;
    const amount = document.querySelector('#amount').value;
    const tag = document.querySelector('#tag').value;

    // Validate inputs
    if (description && amount && tag) {
        // Add the new item to the flowItems array
        flowItems.push({ description, amount: parseInt(amount, 10), tag });
        incomeList.innerHTML = '';
        expenseList.innerHTML = '';
        // Update the statement and balance
        load_statement();
        totalStatement();

        // Clear the form fields
        document.querySelector('#description').value = '';
        document.querySelector('#amount').value = '';
        document.querySelector('#tag').value = 'positive';
    }
});

load_statement();
load_balance();

console.log(flowItems);
totalStatement();