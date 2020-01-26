function calculate(model) {

	var totalGross = 0.0
	var totalNet = 0.0
	var totalFees = 0.0
	var totalIRRF = 0.0

	for (i = 0; i < model.length; i++) {
		var gross = cleanValue(model[i].grossValue)
		var net = cleanValue(model[i].netValue)
		var fees = cleanValue(model[i].totalFees)
		var irrf = cleanValue(model[i].totalIRRF)

		console.log(gross + " : " + net + " : " + fees + " : " + irrf)

		totalGross = totalGross + gross
		totalNet = totalNet + net
		totalFees = totalFees + fees
		totalIRRF = totalIRRF + irrf
	}

	console.log(totalGross + " : " + totalNet + " : " + totalFees + " : " + totalIRRF)
}

function cleanValue(value) {
	return parseFloat(value.replace("R$", "").replace(",", ".").replace(/\s/g, '').trim())
}