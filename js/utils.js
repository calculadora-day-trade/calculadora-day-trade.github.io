/**
 * Verifica se é uma nota unica de corretagem 
 */
function isUniqueNote() {
	return document.getElementById("radio-button-yes").checked
}

/**
 * Metodo responsavel por ordenar a lista
 */
function compare(a, b) {
	var d1 = a.date.split("/")
    var d2 = b.date.split("/")

    var finalDate1 = d1[2] + "-" + d1[1] + "-" + d1[0]
    var finalDate2 = d2[2] + "-" + d2[1] + "-" + d2[0]

	if (finalDate1 < finalDate2) {
		return -1
	}
	if (finalDate1 > finalDate2) {
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
	return operationType == "C"
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

/**
 * Metodo responsavel por converter para float e remover todos os caracteres especiais
 * @param value String
 */
function cleanValue(value) {
	return parseFloat(value.replace("R$", "").replace(",", ".").replace(/\s/g, '').trim())
}
