const incomeList = document.querySelector('#income_list');
const expenseList = document.querySelector('#expense_list');

const flowItems = [
    {description:'Car', amount: '100', tag:'negative'},
    {description:'Salary', amount: '1200', tag:'positive'}
];

flowItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.description;

    if (item.tag === 'positive') {
        incomeList.appendChild(li);
    } else if (item.tag === 'negative') {
        expenseList.appendChild(li);
    }
});

console.log(flowItems);
