
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
