import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'uuidv4';

class User {
    constructor(username,password,email){
        this.id = uuidv4();
        this.username = username;
        this.password = password;
        this.email = email;
        this.budgets = [];
    }
    makeBudget(name,date){
        this.budgets.push(new Budget(name,date));
    }
}

class Budget {    
    constructor(name,yearCreated,monthCreated,dayCreated){
        this.id = uuidv4();
        this.name = name;
        this.yearCreated = yearCreated;
        this.monthCreated = monthCreated;
        this.dayCreated = dayCreated;
        this.accounts = [];
        this.groups = [];
        this.categories = [];
        this.balances = [];
        this.payees = [];
        this.transactions = [];
    }
    addAccount(name,balance,currency) {
        this.accounts.push(new Account(name,balance,currency));
        this.accounts.sort((a1, a2) => (a1.name > a2.name) ? 1 : (a1.name < a2.name) ? -1 : 0);
    }
    getAccountIDbyName(accountName) {
        let accountID = null;
        for (let account of this.accounts) {
            if (account.name === accountName) {
                accountID = account.id;
                break;
            }
        }
        return accountID;
    }
    addGroup(name){
        this.groups.push(name);
        this.groups.sort();
    }
    addCategory(name,groupName,year,month) {
        const categoryID = uuidv4();
        this.categories.push(new Category(categoryID,name,groupName,year,month));
        this.categories.sort((c1, c2) => (c1.name > c2.name) ? 1 : (c1.name < c2.name) ? -1 : 0);
        this.balances.push(new Balance('assigned',0.00,categoryID,year,month));
        this.balances.push(new Balance('available',0.00,categoryID,year,month));
    }
    getCategoryIDbyName(categoryName) {
        let categoryID = null;
        for (let category of this.categories) {
            if (category.name === categoryName) {
                categoryID = category.id;
                break;
            }
        }
        return categoryID;
    }
    assignBalance(amount,categoryID,year,month) {
        let oldAssignedBalance = 0.0;
        // Updating the assigned balance for this month and year.
        for (let balance of this.balances) {
            if (balance.type === 'assigned' && balance.categoryID === categoryID && balance.year === year && balance.month === month) {
                oldAssignedBalance += balance.amount;
                balance.amount += amount - oldAssignedBalance;                
                break;
            }
        }
        // Updating the available balance for this month and year.
        for (let balance of this.balances) {
            if (balance.type === 'available' && balance.categoryID === categoryID && balance.year === year && balance.month === month) {
                balance.amount += amount - oldAssignedBalance;                
                break;
            }
        }
    }
    addPayee(name) {
        let payeeExists = false;
        for (payee in this.payees) {
            if (payee === name) {
                payeeExists = true;
                break;
            }
        }
        if (!payeeExists) {
            this.payees.push(name);
            this.payees.sort();
        }
    }
    addTransaction(amount,payee,year,month,day,accountID,categoryID){
        this.transactions.push(new Transaction(amount,payee,year,month,day,accountID,categoryID));
        this.addPayee(payee);
        // Updating the category's available balance.
        for(let balance of this.balances){
            if (balance.type === 'available' && balance.categoryID === categoryID && balance.year === year && balance.month === month) {
                balance.amount += amount;
                break;
            }
        }
        // Updating the account's balance.
        for (let account of this.accounts){
            if (account.id === accountID){
                account.balance += amount;
                break;
            }
        }
    }
}   

class Account {
    constructor(name,balance,currency){
        this.id = uuidv4();
        this.name = name;
        this.balance = balance;
        this.currency = currency;
    }
}   

class Category {
    constructor(id,name,groupName,year,month) {
        this.id = id;
        this.name = name;
        this.groupName = groupName;
        this.yearCreated = year;
        this.monthCreated = month;
    }
}

class Balance {
    constructor(type,amount,categoryID,year,month) {
        this.type = type; // type = 'assigned', 'active', or 'available'
        this.amount = amount;
        this.categoryID = categoryID;
        this.year = year;
        this.month = month;
    }
}

class Transaction {
    constructor(amount,payee,year,month,day,accountID,categoryID) {
        this.id = uuidv4();
        this.amount = amount;
        this.payee = payee;
        this.year = year;
        this.month = month;
        this.day = day;
        this.accountID = accountID;
        this.categoryID = categoryID;
    }
}

export {
    User, Budget, 
}




/*
Notes

    - Empty balances must be added whenever a new date is navigated to.
*/