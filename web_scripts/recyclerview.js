import {User} from "../data_model/classes.js";

function getData() {
    // A new day begins.
    const todaysDate = '2023-11-01';
    const todaysYear = 2023;
    const todaysMonth = 11;
    const todaysDay = 1;

    // A new user is created.
    const anjelove = new User('anjelove','password1234','jelovalera@gmail.com');
   
    // The user starts a new budget.
    anjelove.makeBudget('Anjelo\'s Budget',todaysYear,todaysMonth,todaysDay);

    // The user adds their Checkings account.
    const myStartingBalance = 5000.00;
    const currency = 'USD';
    anjelove.budgets[0].addAccount('Checking',myStartingBalance,currency);

    // The user creates two new groups.
    anjelove.budgets[0].addGroup('Essential');
    anjelove.budgets[0].addGroup('Nonessential');

    // The user creates four new categories.
    anjelove.budgets[0].addCategory('Gas','Essential',todaysYear,todaysMonth);
    anjelove.budgets[0].addCategory('Food','Essential',todaysYear,todaysMonth);
    anjelove.budgets[0].addCategory('Cannabis','Nonessential',todaysYear,todaysMonth);
    anjelove.budgets[0].addCategory('Video Games','Nonessential',todaysYear,todaysMonth);

    // The user assigns money to all categories.
    anjelove.budgets[0].addtoAssignedBalance(100.00,anjelove.budgets[0].getCategoryIDbyName('Gas'),todaysYear,todaysMonth);    
    anjelove.budgets[0].addtoAssignedBalance(200.00,anjelove.budgets[0].getCategoryIDbyName('Food'),todaysYear,todaysMonth);   
    anjelove.budgets[0].addtoAssignedBalance(80.00,anjelove.budgets[0].getCategoryIDbyName('Cannabis'),todaysYear,todaysMonth);    
    anjelove.budgets[0].addtoAssignedBalance(70.00,anjelove.budgets[0].getCategoryIDbyName('Video Games'),todaysYear,todaysMonth);

    // The user creates two transactions.
    anjelove.budgets[0].addTransaction(-45.00,"Curaleaf",todaysYear,todaysMonth,todaysDay,anjelove.budgets[0].getAccountIDbyName('Checking'),anjelove.budgets[0].getCategoryIDbyName('Cannabis'));
    anjelove.budgets[0].addTransaction(-100.00,"Curaleaf",todaysYear,todaysMonth,todaysDay,anjelove.budgets[0].getAccountIDbyName('Checking'),'unassigned_category');

    return anjelove.budgets[0].getRecyclerViewData(todaysYear,todaysMonth);
}


if (typeof document !== 'undefined') {
    
    const recyclerView = document.querySelector('recyclerview')
    const currencySymbol = '$'
    
    function initRecyclerView(data){
        recyclerView = document.createElement('div');
        for (let i=0;i<data.groupNames.length;i++){
            recyclerView.appendChild(getCategoryView(data.categoryNames[i],data.assignedValues[i],data.availableValues[i]));
        }
    }
    
    function getCategoryView(categoryName,assignedBalance,availableBalance){
        const categoryView = document.createElement('div');
        const categoryNameView = document.createElement('div');
        const categoryAssignedBalanceView = document.createElement('div');
        const categoryAvailableBalanceView = document.createElement('div');
    
        categoryView.classList.add('categoryview');
        categoryNameView.classList.add('categoryview_name');
        categoryAssignedBalanceView.classList.add('categoryview_assigned');
        categoryAvailableBalanceView.classList.add('categoryview_available');
    
        categoryNameView.appendChild(document.createTextNode(categoryName));
        categoryAssignedBalanceView.appendChild(document.createTextNode(currencySymbol+assignedBalance));
        categoryAvailableBalanceView.appendChild(document.createTextNode(currencySymbol+availableBalance));
        
        categoryView.appendChild(categoryNameView);
        categoryView.appendChild(categoryAssignedBalanceView);
        categoryView.appendChild(categoryAvailableBalanceView);
    
        return categoryView;
    }

    initRecyclerView(getData());


}

