
/**
 * Metodo responsavel por ordenar a lista
 */
function compare(a, b) {
	if (a.date < b.date) {
		return -1
	}
	if (a.date > b.date) {
		return 1
	}
	return 0
}

/**
 * Metodo responsavel por receber um tipo float de valor e formatar para R$ 1.100,00
 */
function format(valueFloat) {
	var value = valueFloat.toFixed(2).toString()
	if (value.includes("-")) {
		return "- " + formatMoney(value).replace("-","")
	} else {
		return formatMoney(value)
	}
}

/**
 * SIM! É GAMBIARRA, VOU ARRUMAR ISSO EM UM FUTURO PROXIMO
 */
function formatMoney(value) {
	return "R$ " + value.replace(/\B(?=(\d{3})+(?!\d))/g, "|").replace(".", ",").replace("|", ".")
}

/**
 * Retorna true caso a operaçao seja gain ou false se foi loss
 * @param operationType String
 */
function isCredit(operationType) {
	return operationType == TERRA_CORRETORA.CREDIT
}

/**
 * Metodo responsavel por remover os espacos de um texto
 * @param text String
 */
function formatResult(value) {
	return value.trim()
}

/**
 * Metodo responsavel por receber um texto, remover os espacos e colocar R$
 * @param text String
 */
function formatPositiveValue(value) {
	return "R$ " + formatResult(value)
}

/**
 * Metodo responsavel por receber um texto, remover os espacos e colocar R$
 * @param text String
 */
function formatNegativeValue(value) {
	return "- R$ " + formatResult(value)
}

/**
 * Metodo responsavel por remover os extras espaços do pdf
 * @param text String
 */
function removeExtraSpaces(text) {
	return text.replace("(", " ").replace(")", " ").replace(/\s+/g,' ').trim()
}
