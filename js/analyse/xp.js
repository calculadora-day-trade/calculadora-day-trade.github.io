function analyseXPCorretora(finalString) {
	if (isUniqueNote()) {
		return allPages(finalString)
	} else {
		return onlyLastPage(finalString)
	}
}

function allPages(finalString) {
	var allIrrf = getFromBetween.get(finalString, XP_CORRETORA.IRRF_DAY_TRADE_FIRST_WORD, XP_CORRETORA.IRRF_DAY_TRADE_SECOND_WORD)
	var allCode = getFromBetween.get(finalString, XP_CORRETORA.CLIENT_CODE_FIRST_WORD, XP_CORRETORA.CLIENT_CODE_SECOND_WORD)
	var allDate = getFromBetween.get(finalString, XP_CORRETORA.DATE_FIRST_WORD, XP_CORRETORA.DATE_SECOND_WORD)
	var allNumber = getFromBetween.get(finalString, XP_CORRETORA.NOTE_NUMBER_FIRST_WORD, XP_CORRETORA.NOTE_NUMBER_SECOND_WORD)
	var allFees = getFromBetween.get(finalString, XP_CORRETORA.TOTAL_FEES_FIRST_WORD, XP_CORRETORA.TOTAL_FEES_SECOND_WORD)
	var allGross = getFromBetween.get(finalString, XP_CORRETORA.GROSS_VALUE_FIRST_WORD, XP_CORRETORA.GROSS_VALUE_SECOND_WORD)
	var allNet = getFromBetween.get(finalString, XP_CORRETORA.NET_VALUE_FIRST_WORD, XP_CORRETORA.NET_VALUE_SECOND_WORD)

	var notes = []
	var i;
	for (i = 0; i < allCode.length; i++) {
		var irrf = allIrrf[i].toString().split("|")[1].trim().split(" ")[0]
		var fees = allFees[i].toString().split("|")[2].trim().split(" ")[1]
		var gross = allGross[i].toString().split("|")[0].trim().split(" ")[4]
		var net = allNet[i].toString().split("|")[3].trim().split(" ")[1]

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
		console.log("Data: " + allDate[i])
		console.log("Numero da Nota: " + allNumber[i])
		console.log("Bruto: " + finalGross)
		console.log("Liquido: " + finalNet)
		console.log("Taxas " + fees)
		console.log("Impostos " + irrf)
		console.log("Gain " + isCredit(operationType))
		console.log("################")

		var note = { 
			clientCode: formatResult(allCode[i]), 
			date: formatResult(allDate[i]), 
			noteNumber: formatResult(allNumber[i]), 
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

function onlyLastPage(finalString) {
	var irrf = getFromBetween.get(finalString, XP_CORRETORA.IRRF_DAY_TRADE_FIRST_WORD, XP_CORRETORA.IRRF_DAY_TRADE_SECOND_WORD)
	var code = getFromBetween.get(finalString, XP_CORRETORA.CLIENT_CODE_FIRST_WORD, XP_CORRETORA.CLIENT_CODE_SECOND_WORD)
	var date = getFromBetween.get(finalString, XP_CORRETORA.DATE_FIRST_WORD, XP_CORRETORA.DATE_SECOND_WORD)
	var number = getFromBetween.get(finalString, XP_CORRETORA.NOTE_NUMBER_FIRST_WORD, XP_CORRETORA.NOTE_NUMBER_SECOND_WORD)
	var fees = getFromBetween.get(finalString, XP_CORRETORA.TOTAL_FEES_FIRST_WORD, XP_CORRETORA.TOTAL_FEES_SECOND_WORD)
	var gross = getFromBetween.get(finalString, XP_CORRETORA.GROSS_VALUE_FIRST_WORD, XP_CORRETORA.GROSS_VALUE_SECOND_WORD)
	var net = getFromBetween.get(finalString, XP_CORRETORA.NET_VALUE_FIRST_WORD, XP_CORRETORA.NET_VALUE_SECOND_WORD)

	irrf = irrf.toString().split("|")[1].trim().split(" ")[0]
	fees = fees.toString().split("|")[2].trim().split(" ")[1]
	gross = gross.toString().split("|")[0].trim().split(" ")[4]
	net = net.toString().split("|")[3].trim().split(" ")[1]

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
	console.log("Codigo do Cliente: " + code[0])
	console.log("Data: " + date[0])
	console.log("Numero da Nota: " + number[0])
	console.log("Bruto: " + finalGross)
	console.log("Liquido: " + finalNet)
	console.log("Taxas " + fees)
	console.log("Impostos " + irrf)
	console.log("Gain " + isCredit(operationType))
	console.log("################")

	var notes = { 
		clientCode: formatResult(code[0]), 
		date: formatResult(date[0]), 
		noteNumber: formatResult(number[0]), 
		grossValue: finalGross, 
		netValue: finalNet, 
		totalFees: formatNegativeValue(fees), 
		totalIRRF: formatPositiveValue(irrf),
		gain: isCredit(operationType)
	}

	return notes
}

const XP_CORRETORA = {

    DEBIT: "D",
    CREDIT: "C",

    // codigo do cliente
    CLIENT_CODE_FIRST_WORD: "Codigo do Cliente",
    CLIENT_CODE_SECOND_WORD: "Venda disponível",
    
    // data do pregão
    DATE_FIRST_WORD: "Data pregão",
    DATE_SECOND_WORD: "XP INVESTIMENTOS",
    
    // número da nota
    NOTE_NUMBER_FIRST_WORD: "Nr. nota",
    NOTE_NUMBER_SECOND_WORD: "Folha",
    
    // valor bruto
    GROSS_VALUE_FIRST_WORD: "Valor dos negócios",
    GROSS_VALUE_SECOND_WORD: "IRRFIRRF Day Trade",
    
    // valor líquido 
    NET_VALUE_FIRST_WORD: "Total líquido da nota",
    NET_VALUE_SECOND_WORD: "Custos BM&F",

    // taxas 
    TOTAL_FEES_FIRST_WORD: "Total de custos operacionais",
    TOTAL_FEES_SECOND_WORD: "OutrosIRRF",

    // IRRF
    IRRF_DAY_TRADE_FIRST_WORD: "BM&FTaxas BM&F (emol+f.gar)",
    IRRF_DAY_TRADE_SECOND_WORD: "Outros CustosImpostosAjuste"
}