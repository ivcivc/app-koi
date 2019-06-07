import ptMessages from 'devextreme/localization/messages/pt.json'

import { locale, loadMessages, formatMessage } from 'devextreme/localization'

import config from 'devextreme/core/config'

config({
    defaultCurrency: 'BRL',
    decimalSeparator: ',',
    serverDecimalSeparator: '.',
    thousandsSeparator: '.',
})

sessionStorage.setItem('locale', 'pt')

loadMessages(ptMessages)

locale('pt')

import 'devextreme-intl'

//console.log(new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 3 }).format(numero));

export default { ptMessages, locale, loadMessages, formatMessage, config }
