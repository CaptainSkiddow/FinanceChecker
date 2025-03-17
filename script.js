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



load_statement();
load_balance();

console.log(flowItems);
totalStatement();