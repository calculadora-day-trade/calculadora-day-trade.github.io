function analyseTerraCorretora(finalString) {
	var irrf = getFromBetween.get(finalString, TERRA_CORRETORA.IRRF_DAY_TRADE_FIRST_WORD, TERRA_CORRETORA.IRRF_DAY_TRADE_SECOND_WORD)
	var code = getFromBetween.get(finalString, TERRA_CORRETORA.CLIENT_CODE_FIRST_WORD, TERRA_CORRETORA.CLIENT_CODE_SECOND_WORD)
	var date = getFromBetween.get(finalString, TERRA_CORRETORA.DATE_FIRST_WORD, TERRA_CORRETORA.DATE_SECOND_WORD)
	var number = getFromBetween.get(finalString, TERRA_CORRETORA.NOTE_NUMBER_FIRST_WORD, TERRA_CORRETORA.NOTE_NUMBER_SECOND_WORD)
	var fees = getFromBetween.get(finalString, TERRA_CORRETORA.TOTAL_FEES_FIRST_WORD, TERRA_CORRETORA.DEBIT)

	var operationType = TERRA_CORRETORA.CREDIT
	if (formatResult(irrf[0]) == "0,00") {
		operationType = TERRA_CORRETORA.DEBIT
	}

	var gross = getFromBetween.get(finalString, TERRA_CORRETORA.GROSS_VALUE_FIRST_WORD, operationType)
	var net = getFromBetween.get(finalString, TERRA_CORRETORA.NET_VALUE_FIRST_WORD, operationType)
	
	var finalGross = formatNegativeValue(gross[0])
	var finalNet = formatNegativeValue(net[0])
	if (isCredit(operationType)) {
		finalGross = formatPositiveValue(gross[0])
		finalNet = formatPositiveValue(net[0])
	}

	console.log("################")
	console.log("Codigo do Cliente: " + code[0])
	console.log("Data: " + date[0])
	console.log("Numero da Nota: " + number[0])
	console.log("Bruto: " + finalGross)
	console.log("Liquido: " + finalNet)
	console.log("Taxas " + fees[0])
	console.log("Impostos " + irrf[0])
	console.log("Gain " + isCredit(operationType))
	console.log("################")

	var notes = { 
		clientCode: formatResult(code[0]), 
		date: formatResult(date[0]), 
		noteNumber: formatResult(number[0]), 
		grossValue: finalGross, 
		netValue: finalNet, 
		totalFees: formatNegativeValue(fees[0]), 
		totalIRRF: formatPositiveValue(irrf[0]),
		gain: isCredit(operationType)
	}

	return notes
}

const TERRA_CORRETORA = {

	DEBIT: "D",
	CREDIT: "C",

	// codigo do cliente
	CLIENT_CODE_FIRST_WORD: "Código do cliente",
    CLIENT_CODE_SECOND_WORD: "Assessor",
    
    // data do pregão
    DATE_FIRST_WORD: "Data Pregão",
    DATE_SECOND_WORD: "Corretora",
    
    // número da nota
    NOTE_NUMBER_FIRST_WORD: "Nr. nota",
    NOTE_NUMBER_SECOND_WORD: "Folha",
    
    // valor bruto
    GROSS_VALUE_FIRST_WORD: "Valor dos negócios",
    
    // valor líquido 
    NET_VALUE_FIRST_WORD: "Total liquido da nota",

    // taxas 
    TOTAL_FEES_FIRST_WORD: "Total das despesas",

    // IRRF
    IRRF_DAY_TRADE_FIRST_WORD: "IRRF Day Trade Projeção",
    IRRF_DAY_TRADE_SECOND_WORD: "Taxa Operacional"
}