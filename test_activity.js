import { User } from "./data_model/classes.js";
import { ViewModel } from "./data_model/viewmodel.js";

function startActivity() {
    // A new day begins.
    const todaysDate = '2023-11-01';
    const todaysYear = 2023;
    const todaysMonth = 11;
    const todaysDay = 1;

    // A new user is created.
    const anjelove = new User('anjelove', 'password1234', 'jelovalera@gmail.com');

    // The user starts a new budget.
    anjelove.makeBudget('Anjelo\'s Budget', todaysYear, todaysMonth, todaysDay);

    // The user adds their Checkings account.
    const myStartingBalance = 5000.00;
    const currency = 'USD';
    anjelove.budgets[0].addAccount('Checking', myStartingBalance, currency);

    // The user creates two new groups.
    anjelove.budgets[0].addGroup('Essential');
    anjelove.budgets[0].addGroup('Nonessential');

    // The user creates four new categories.
    anjelove.budgets[0].addCategory('Gas', 'Essential', todaysYear, todaysMonth);
    anjelove.budgets[0].addCategory('Food', 'Essential', todaysYear, todaysMonth);
    anjelove.budgets[0].addCategory('Cannabis', 'Nonessential', todaysYear, todaysMonth);
    anjelove.budgets[0].addCategory('Video Games', 'Nonessential', todaysYear, todaysMonth);

    // The user assigns money to all categories.
    anjelove.budgets[0].addtoAssignedBalance(100.00, anjelove.budgets[0].getCategoryIDbyName('Gas'), todaysYear, todaysMonth);
    anjelove.budgets[0].addtoAssignedBalance(200.00, anjelove.budgets[0].getCategoryIDbyName('Food'), todaysYear, todaysMonth);
    anjelove.budgets[0].addtoAssignedBalance(80.00, anjelove.budgets[0].getCategoryIDbyName('Cannabis'), todaysYear, todaysMonth);
    anjelove.budgets[0].addtoAssignedBalance(70.00, anjelove.budgets[0].getCategoryIDbyName('Video Games'), todaysYear, todaysMonth);

    // The user creates two transactions.
    anjelove.budgets[0].addTransaction(-45.00, "Curaleaf", todaysYear, todaysMonth, todaysDay, anjelove.budgets[0].getAccountIDbyName('Checking'), anjelove.budgets[0].getCategoryIDbyName('Cannabis'));
    anjelove.budgets[0].addTransaction(-100.00, "Curaleaf", todaysYear, todaysMonth, todaysDay, anjelove.budgets[0].getAccountIDbyName('Checking'), 'unassigned_category');

     // The ViewModel is instantiated.
    const viewModelData = {selectedYear:todaysYear, selectedMonth:todaysMonth, unassignedBalance:anjelove.budgets[0].getUnassignedBalance(), groupData:anjelove.budgets[0].getGroupData(todaysYear, todaysMonth)};
    const viewModel = new ViewModel(viewModelData);

}

startActivity();