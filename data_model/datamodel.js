import { Currency } from "./currency_formatter.js";

export class DataModel{
    constructor(user,locale,currency,selectedBudgetIndex){
        this.user = user;
        this.currencyFormatter =
        this.selectedBudgetIndex = selectedBudgetIndex;
    }
    
    createBudget(name,year,month,day,locale,currency){
        this.user.setBudget(name,year,month,day,locale,currency);
    }
    createAccount(name,balance){
        // Create new account
        this.user.budgets[this.selectedBudgetIndex].setAccount(name,balance);
        // Update unassigned balance
        this.addtoUnassignedBalance(balance);
    }
    deleteAccount(accountID){
        // Account object is deleted.
        const accountBalanceFloat = formatCurrencyToFloat(this.user.budgets[this.selectedBudgetIndex].getAccountBalance(accountID));
        for (let i in this.user.budgets[this.selectedBudgetIndex].accounts){
            if (this.user.budgets[this.selectedBudgetIndex].accounts[i].id === accountID){
                this.user.budgets[this.selectedBudgetIndex].accounts.splice(i,1);
            }
        }
        // Update unassigned balance.
        this.addtoUnassignedBalance(-accountBalanceFloat);
    }

    addtoUnassignedBalance(addend) {
        for (let balance of this.user.budgets[this.selectedBudgetIndex].getBalances()) {
            if (balance.type = 'unassigned') {
                const oldBalanceFloat = formatCurrencyToFloat(balance.amount);
                balance.amount = formatFloatToCurrency(this.locale,this.currency,oldBalanceFloat + addend);
                break;
            }
        }
    }
}