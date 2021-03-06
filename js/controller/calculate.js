/**
 * Metodo responsavel por realizar a somatoria das notas de negociação
 * @param model Model
 */
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

		totalGross = totalGross + gross
		totalNet = totalNet + net
		totalFees = totalFees + fees
		totalIRRF = totalIRRF + irrf
	}

	var total = totalNet + totalIRRF
	var ir = 0
	if (total > 0) {
		ir = ((total * 20) / 100) - totalIRRF
	}

	var result = {
		grossValue: totalGross,
		netValue: totalNet,
		totalFees: totalFees,
		totalIRRF: totalIRRF,
		total: total,
		ir: ir
	}

	return result
}
