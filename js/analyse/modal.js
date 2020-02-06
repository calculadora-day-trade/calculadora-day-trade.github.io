function analyseModalCorretora(finalString) {
	if (isUniqueNote()) {
		return analyseModalCorretoraAllPages(finalString)
	} else {
		return analyseModalCorretoraOnlyLastPage(finalString)
	}
}

function analyseModalCorretoraOnlyLastPage(finalString) {
	var date = getFromBetween.get(finalString, MODAL_CORRETORA.DATE_FIRST_WORD, MODAL_CORRETORA.DATE_SECOND_WORD)

	var irrf = getFromBetween.get(finalString, MODAL_CORRETORA.IRRF_DAY_TRADE_FIRST_WORD, MODAL_CORRETORA.IRRF_DAY_TRADE_SECOND_WORD)
	var fees = getFromBetween.get(finalString, MODAL_CORRETORA.TOTAL_FEES_FIRST_WORD, MODAL_CORRETORA.TOTAL_FEES_SECOND_WORD)
	var code = getFromBetween.get(finalString, MODAL_CORRETORA.CLIENT_CODE_FIRST_WORD, MODAL_CORRETORA.CLIENT_CODE_SECOND_WORD)
	var gross = getFromBetween.get(finalString, MODAL_CORRETORA.GROSS_VALUE_FIRST_WORD, MODAL_CORRETORA.GROSS_VALUE_SECOND_WORD)
	var net = getFromBetween.get(finalString, MODAL_CORRETORA.NET_VALUE_FIRST_WORD, MODAL_CORRETORA.NET_VALUE_SECOND_WORD)
	// var number = getFromBetween.get(finalString, MODAL_CORRETORA.NOTE_NUMBER_FIRST_WORD, MODAL_CORRETORA.NOTE_NUMBER_SECOND_WORD)

	irrf = irrf.toString().replace(")", "").replace("(", "").replace("Day Trade Projeção", "").replace("Day TradeProjeção", "").trim()
	fees = fees.toString().trim()
	gross = gross.toString().trim()
	net = net.toString().trim()

	var number = date.toString().trim().substring(0, date.toString().length - 11)
	date = date.toString().trim().substring(7, date.toString().length);

	var operationType = MODAL_CORRETORA.CREDIT
	if (formatResult(irrf)== "0,00") {
		operationType = MODAL_CORRETORA.DEBIT
	}

	var finalGross = formatNegativeValue(gross)
	var finalNet = formatNegativeValue(net)
	if (isCredit(operationType)) {
		finalGross = formatPositiveValue(gross)
		finalNet = formatPositiveValue(net)
	}

	console.log("################")
	console.log("Codigo do Cliente: " + code[0])
	console.log("Data: " + date)
	console.log("Numero da Nota: " + number)
	console.log("Bruto: " + finalGross)
	console.log("Liquido: " + finalNet)
	console.log("Taxas " + fees)
	console.log("Impostos " + irrf)
	console.log("Gain " + isCredit(operationType))
	console.log("################")

	var notes = { 
		clientCode: formatResult(code[0]), 
		date: formatResult(date), 
		noteNumber: formatResult(number), 
		grossValue: finalGross, 
		netValue: finalNet, 
		totalFees: formatNegativeValue(fees), 
		totalIRRF: formatPositiveValue(irrf),
		gain: isCredit(operationType)
	}

	return notes
}

function analyseModalCorretoraAllPages(finalString) {
	var allDdate = getFromBetween.get(finalString, MODAL_CORRETORA.DATE_FIRST_WORD, MODAL_CORRETORA.DATE_SECOND_WORD)
	var allIrrf = getFromBetween.get(finalString, MODAL_CORRETORA.IRRF_DAY_TRADE_FIRST_WORD, MODAL_CORRETORA.IRRF_DAY_TRADE_SECOND_WORD)
	var allFees = getFromBetween.get(finalString, MODAL_CORRETORA.TOTAL_FEES_FIRST_WORD, MODAL_CORRETORA.TOTAL_FEES_SECOND_WORD)
	var allCode = getFromBetween.get(finalString, MODAL_CORRETORA.CLIENT_CODE_FIRST_WORD, MODAL_CORRETORA.CLIENT_CODE_SECOND_WORD)
	var allGross = getFromBetween.get(finalString, MODAL_CORRETORA.GROSS_VALUE_FIRST_WORD, MODAL_CORRETORA.GROSS_VALUE_SECOND_WORD)
	var allNet = getFromBetween.get(finalString, MODAL_CORRETORA.NET_VALUE_FIRST_WORD, MODAL_CORRETORA.NET_VALUE_SECOND_WORD)
	// var number = getFromBetween.get(finalString, MODAL_CORRETORA.NOTE_NUMBER_FIRST_WORD, MODAL_CORRETORA.NOTE_NUMBER_SECOND_WORD)

	var notes = []
	var i;
	for (i = 0; i < allCode.length; i++) {

		var irrf = allIrrf[i].replace(")", "").replace("(", "").replace("Day Trade Projeção", "").replace("Day TradeProjeção", "").trim()
		var fees = allFees[i].toString().trim()
		var gross = allGross[i].toString().trim()
		var net = allNet[i].toString().trim()
		var number = allDdate[i].toString().trim().substring(0, allDdate[i].toString().length - 11)
		var date = allDdate[i].toString().trim().substring(7, allDdate[i].toString().length);

		var operationType = XP_CORRETORA.CREDIT
		if (formatResult(irrf)== "0,00") {
			operationType = XP_CORRETORA.DEBIT
		}

		var finalGross = formatNegativeValue(gross)
		var finalNet = formatNegativeValue(net)
		if (isCredit(operationType)) {
			finalGross = formatPositiveValue(gross)
			finalNet = formatPositiveValue(net)
		}

		console.log("################")
		console.log("Codigo do Cliente: " + allCode[i])
		console.log("Data: " + date)
		console.log("Numero da Nota: " + number)
		console.log("Bruto: " + finalGross)
		console.log("Liquido: " + finalNet)
		console.log("Taxas " + fees)
		console.log("Impostos " + irrf)
		console.log("Gain " + isCredit(operationType))
		console.log("################")

		var note = { 
			clientCode: formatResult(allCode[i]), 
			date: formatResult(date), 
			noteNumber: formatResult(number), 
			grossValue: finalGross, 
			netValue: finalNet, 
			totalFees: formatNegativeValue(fees), 
			totalIRRF: formatPositiveValue(irrf),
			gain: isCredit(operationType)
		}

		notes[i] = note
	}

	return notes
}

const MODAL_CORRETORA = {

    DEBIT: "D",
    CREDIT: "C",

    // codigo do cliente
    CLIENT_CODE_FIRST_WORD: "Código do Cliente",
    CLIENT_CODE_SECOND_WORD: "Venda disponível",
    
    // data do pregão
    DATE_FIRST_WORD: "Data pregão",
    DATE_SECOND_WORD: "C.N.P.J",
    
    // número da nota
    // NOTE_NUMBER_FIRST_WORD: "Nr. nota",
    // NOTE_NUMBER_SECOND_WORD: "Folha",
    
    // valor bruto
    GROSS_VALUE_FIRST_WORD: "Valor dos negócios",
    GROSS_VALUE_SECOND_WORD: "|",
    
    // valor líquido 
    NET_VALUE_FIRST_WORD: "Total líquido da nota",
    NET_VALUE_SECOND_WORD: "|",

    // taxas 
    TOTAL_FEES_FIRST_WORD: "Total das despesas",
    TOTAL_FEES_SECOND_WORD: "|",

    // IRRF
    IRRF_DAY_TRADE_FIRST_WORD: "| IRRF",
    IRRF_DAY_TRADE_SECOND_WORD: "Taxa operacional"
}