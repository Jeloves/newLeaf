
export function formatCurrencyToFloat(amount){
    let returnValue = amount;
    for (let i=0;i<amount.length;i++){
        const currentChar = amount[i];
        if (currentChar !== '-' && currentChar !== '.' && currentChar !== '0' && currentChar !== '1' && currentChar !== '2' && currentChar !== '3' && currentChar !== '4' && currentChar !== '5' && currentChar !== '6' && currentChar !== '7' && currentChar !== '8' && currentChar !== '9'){
            returnValue = returnValue.replace(currentChar,'');
        }
    }
    return parseFloat(returnValue);
}

export function formatFloatToCurrency(locale,currency,amount){
    const currencyFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    });
    return currencyFormatter.format(amount);
}

