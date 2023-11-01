import { v4 as uuidv4 } from 'uuid';

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
    constructor(name,dateCreated){
        this.id = uuidv4();
        this.name = name;
        this.dateCreated = dateCreated;
        this.categories = ['Uncategorized'];
    }
    makeAccount(name,balance,currency) {
        
    }
    makeCategory(name){
        this.categories.push(name);
        const index = this.categories.indexOf('Uncategorized')
        this.categories.slice(index);
        this.categories.sort();
        this.categories.push('Uncategorized');
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

export {
    User, Budget, 
}