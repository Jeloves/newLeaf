import { formatCurrencyToFloat,formatFloatToCurrency } from "../parse/parse_currency.js";

class User {
    constructor(username, password, email) {
        this.id = window.crypto.randomUUID();
        this.username = username;
        this.password = password;
        this.email = email;
        this.budgets = [];
    }
    setBudget(name, year, month, day, locale, currency) {
        let nameTaken = false;
        for (let budget in this.budgets){
            if (budget.name === name){
                nameTaken = true;
                break;
            }
        }
        if (nameTaken){
            return false;
        } else {
            this.budgets.push(new Budget(name, year, month, day, locale, currency));
            return true;
        }
    }
    getBudget(budgetID){
        let budgetObject = null;
        for (let budget of this.budgets){
            if (budget.id === budgetID){
                budgetObject = budget;
                break;
            }
        }
        if (budgetObject !== null){
            return budgetObject;
        } else {
            return false;
        }
    }
}

class Budget {
    constructor(name, year, month, day, locale, currency) {
        this.id = window.crypto.randomUUID();
        this.name = name;
        this.year = year;
        this.month = month;
        this.day = day;
        this.locale = locale;
        this.currency = currency;
        this.accounts = [];
        this.groups = [];
        this.categories = [new Category('unassigned_category', 'unassigned', 'unassigned_group', year, month)];
        this.balances = [new Balance('unassigned', formatFloatToCurrency(locale,currency,0.00), 'unassigned_category', year, month)];
        this.payees = [];
        this.transactions = [];
    }

    getBalances(){
        return this.balances;
    }
    addtoUnassignedBalance(addend) {
        for (let balance of this.balances) {
            if (balance.type = 'unassigned') {
                const oldBalanceFloat = formatCurrencyToFloat(balance.amount);
                balance.amount = formatFloatToCurrency(this.locale,this.currency,oldBalanceFloat + addend);
                break;
            }
        }
    }

    setAccount(name, balance) {
        this.accounts.push(new Account(name, formatFloatToCurrency(this.locale,this.currency,balance)));
        this.accounts.sort((a1, a2) => (a1.name > a2.name) ? 1 : (a1.name < a2.name) ? -1 : 0);
    }
    getAccountBalance(accountID){
        let balance = null;
        for (let account of this.accounts){
            if (account.id === accountID){
                balance = account.balance;
                break;
            }
        }
        return balance;
    }
    
    setGroup(name) {
        this.groups.push(name);
        this.groups.sort();
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
    addtoAccountBalance(amount, accountID) {
        for (let account of this.accounts) {
            if (account.id === accountID) {
                account.balance += amount;
                break;
            }
        }
    }
    addGroup(name) {
        this.groups.push(name);
        this.groups.sort();
    }
    addCategory(name, groupName, year, month) {
        const categoryID = window.crypto.randomUUID();
        this.categories.push(new Category(categoryID, name, groupName, year, month));
        this.categories.sort((c1, c2) => (c1.name > c2.name) ? 1 : (c1.name < c2.name) ? -1 : 0);
        this.balances.push(new Balance('assigned', 0.00, categoryID, year, month));
        this.balances.push(new Balance('available', 0.00, categoryID, year, month));
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
    addtoAssignedBalance(amount, categoryID, year, month) {
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
        // Updating the unassigned balance.
        this.addtoUnassignedBalance(amount);
    }
    addtoAvailableBalance(amount, categoryID, year, month) {
        for (let balance of this.balances) {
            if (balance.type === 'available' && balance.categoryID === categoryID && balance.year === year && balance.month === month) {
                balance.amount += amount;
                break;
            }
        }
    }
    addPayee(name) {
        let payeeExists = false;
        for (let payee in this.payees) {
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
    addTransaction(amount, payee, year, month, day, accountID, categoryID) {
        this.transactions.push(new Transaction(amount, payee, year, month, day, accountID, categoryID));
        this.addPayee(payee);
        this.addtoAccountBalance(amount, accountID);
        if (categoryID === 'unassigned_category') {
            this.addtoUnassignedBalance(amount);
        } else {
            this.addtoAvailableBalance(amount, categoryID, year, month);
        }
    }
    getUnassignedBalance(){
        let unassignedBalance = null;
        for (let balance of this.balances){
            if (balance.type === 'unassigned'){
                unassignedBalance = balance.amount;
                break;
            }
        }
        return unassignedBalance
    }

    getGroupData(year, month) {
        // Make Category Objects
        const categoryObjects = [];
        for (let category of this.categories) {
            if (category.id !== 'unassigned_category') {
                const filteredBalances = this.balances.filter(balance => balance.categoryID === category.id && balance.year === year && balance.month === month);
                let assignedValue = null;
                let availableValue = null;
                if (filteredBalances[0].type == 'assigned') {
                    assignedValue = filteredBalances[0].amount;
                    availableValue = filteredBalances[1].amount;
                } else {
                    assignedValue = filteredBalances[1].amount;
                    availableValue = filteredBalances[0].amount;
                }
                const categoryObject = { groupName: category.groupName, categoryName: category.name, assignedValue: assignedValue, availableValue: availableValue };
                categoryObjects.push(categoryObject);
                categoryObjects.sort((c1, c2) => (c1.categoryName > c2.categoryName) ? 1 : (c1.categoryName < c2.categoryName) ? -1 : 0);
            }
        }
        // Make Group Objects
        const data = [];
        for (let group of this.groups) {
            const groupObject = { groupName: group, categoryObjects: [] };
            for (let categoryObject of categoryObjects) {
                if (categoryObject.groupName === groupObject.groupName) {
                    groupObject.categoryObjects.push(categoryObject);
                }
            }
            data.push(groupObject);
            data.sort((g1, g2) => (g1.groupName > g2.groupName) ? 1 : (g1.groupName < g2.groupName) ? -1 : 0);
        }
        return data;
    }
}

class Account {
    constructor(name, balance) {
        this.id = window.crypto.randomUUID();
        this.name = name;
        this.balance = balance;
    }
}



class Category {
    constructor(id, name, groupName, year, month) {
        this.id = id;
        this.name = name;
        this.groupName = groupName;
        this.year = year;
        this.month = month;
    }
}

class Balance {
    constructor(type, amount, categoryID, year, month) {
        this.type = type; // type = 'assigned', or 'available'
        this.amount = amount;
        this.categoryID = categoryID;
        this.year = year;
        this.month = month;
    }
}

class Transaction {
    constructor(amount, payee, year, month, day, accountID, categoryID) {
        this.id = window.crypto.randomUUID();
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