export class currencyFormmater {
    #selectedLocale = 'en-US';
    #selectedCurrency = 'USD';
    #formatter = new Intl.NumberFormat(this.#selectedLocale, {
        style: 'currency',
        currency: this.#selectedCurrency
    });

    setLocale(locale)
}