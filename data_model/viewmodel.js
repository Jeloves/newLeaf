import { User } from '../data_model/classes.js';
import { DataModel } from '../data_model/datamodel.js';
import { formatFloatToCurrency,formatCurrencyToFloat } from '../parse/parse_currency.js';


let todaysYear = 2023;
let todaysMonth = 11;
let todaysDay = 1;
let locale = 'en-US';
let currency = 'USD';
let user = new User('anjelove', 'password1234', 'jelovalera@gmaisl.com');
let selectedBudgetIndex = 0;

let dataModel = new DataModel(user,locale,currency,selectedBudgetIndex);


function startActivity(){

    // The user creates a new budget.
    dataModel.createBudget('Anjelo\'s Budget',todaysYear,todaysMonth,todaysDay,locale,currency);

    // The user creates a checking and credit account.
    dataModel.createAccount('Checking',5237.36);
    dataModel.createAccount('Credit',-27.68);
    const checkingID = dataModel.user.budgets[0].accounts[0].id;
    const creditID = dataModel.user.budgets[0].accounts[1].id;
    
    // The user deletes the credit account.
    console.log(dataModel.user.budgets[0]);
    dataModel.deleteAccount(creditID);



}   
startActivity();