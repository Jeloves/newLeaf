export class Currency {
    #selectedLocale = 'en-US';
    #selectedCurrency = 'USD';
    #formatter = new Intl.NumberFormat(this.#selectedLocale, {
        style: 'currency',
        currency: this.#selectedCurrency
    });
    
    constructor(locale,currency) {
        this.setFormatterOtions(locale,currency)
    }

    setFormatterOtions(locale,currency) {
        if (locale != null) {
            this.#selectedLocale = locale;
        }
        if (currency != null) {
            this.#selectedCurrency = currency;
        }
        const x = new Intl.NumberFormat(this.#selectedLocale, {
            style: 'currency',
            currency: this.#selectedCurrency
        });
        
    }

    format(amountAsFloat) {
        return this.#formatter.format(amountAsFloat);
    }

    unformat(amountAsCurrency) {
        let returnValueArray = [];
        let returnValue = '';

        switch(this.#selectedCurrency) {
            case 'USD':
                for (let i in [...amountAsCurrency]){
                    const char = [...amountAsCurrency][i];
                    if (char !== '$' && char !== ',') {
                        returnValueArray.push(char);
                    }
                }
                returnValue = returnValueArray.filter((char) => char !== ',')
                break;
        }
        return parseFloat(returnValue.join(''));
    }
    
}
