const incomeList = document.querySelector('#income_list');
const expenseList = document.querySelector('#expense_list');
const assetList = document.querySelector('#asset_list');
const liabilityList = document.querySelector('#liability_list');




const flowItems = [
    { description: 'Car', amount: '100', tag: 'negative' },
    { description: 'Salary', amount: '1200', tag: 'positive' }
];

const balanceItems = [
    { description: 'Cash', amount: '1000', tag: 'asset' },
    { description: 'Loan', amount: '500', tag: 'liability' }
]


function load_statement() {
    flowItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.description}: $${item.amount}`;

        if (item.tag === 'positive') {
            incomeList.appendChild(li);
        } else if (item.tag === 'negative') {
            expenseList.appendChild(li);
        }
    })
};


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
    var statementBalance = 0;
    flowItems.forEach(item => {
        statementBalance += item.amount;
    })
    console.log(statementBalance)
}



load_statement();
load_balance();

console.log(flowItems);
totalStatement();