import { v4 as uuidv4 } from 'uuid';
import {User} from "./data_model/classes.js";


function startActivity() {
    // A new day begins.
    const todaysDate = '2023-11-01';
    const todaysYear = '2023';
    const todaysMonth = '11';

    // A new user is created.
    const anjelove = new User('anjelove','password1234','jelovalera@gmail.com');
   
    // The user starts a new budget.
    anjelove.makeBudget('Anjelo\'s Budget',todaysDate);

    // The user adds their Checkings account.
    const myStartingBalance = 5000.00;
    const currency = 'USD';
    anjelove.budgets[0].makeAccount('Checkings',myStartingBalance,currency);

    // The user creates two new categories.
    anjelove.budgets[0].makeCategory('Essential');
    anjelove.budgets[0].makeCategory('Nonessential');


}

startActivity();