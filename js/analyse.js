/**
 * Metodo responsavel por analisar o pdf
 * @param text String
 */
function analyse(text) {
	var finalString = removeExtraSpaces(text)
	console.log(finalString)

	var irrf = getFromBetween.get(finalString, TERRA_CORRETORA.IRRF_DAY_TRADE_FIRST_WORD, TERRA_CORRETORA.IRRF_DAY_TRADE_SECOND_WORD)
	var code = getFromBetween.get(finalString, TERRA_CORRETORA.CLIENT_CODE_FIRST_WORD, TERRA_CORRETORA.CLIENT_CODE_SECOND_WORD)
	var date = getFromBetween.get(finalString, TERRA_CORRETORA.DATE_FIRST_WORD, TERRA_CORRETORA.DATE_SECOND_WORD)
	var number = getFromBetween.get(finalString, TERRA_CORRETORA.NOTE_NUMBER_FIRST_WORD, TERRA_CORRETORA.NOTE_NUMBER_SECOND_WORD)
	var fees = getFromBetween.get(finalString, TERRA_CORRETORA.TOTAL_FEES_FIRST_WORD, TERRA_CORRETORA.DEBIT)

	var operationType = TERRA_CORRETORA.DEBIT
	if (irrf == "0,00") {
		operationType = TERRA_CORRETORA.CREDIT
	}

	var gross = getFromBetween.get(finalString, TERRA_CORRETORA.GROSS_VALUE_FIRST_WORD, operationType)
	var net = getFromBetween.get(finalString, TERRA_CORRETORA.NET_VALUE_FIRST_WORD, operationType)
	
	console.log("################")
	console.log("Codigo do Cliente: " + code[0])
	console.log("Data: " + date[0])
	console.log("Numero da Nota: " + number[0])
	console.log("Bruto: " + gross[0])
	console.log("Liquido: " + net[0])
	console.log("Taxas " + fees[0])
	console.log("Impostos " + irrf[0])
	console.log("Gain " + operationType)
	console.log("################")

	var gain = false
	if (operationType == TERRA_CORRETORA.DEBIT) {
		gain = true
	}

	var model = { 
		clientCode: formatResult(code[0]), 
		date: formatResult(date[0]), 
		noteNumber: formatResult(number[0]), 
		grossValue: formatResult(gross[0]), 
		netValue: formatResult(net[0]), 
		totalFees: formatResult(fees[0]), 
		totalIRRF: formatResult(irrf[0]),
		gain: gain 
	}

	return model
}

function formatResult(value) {
	return value.trim()
}

/**
 * Metodo responsavel por remover os extras espaços do pdf
 * @param text String
 */
function removeExtraSpaces(text) {
	return text.replace("(", " ").replace(")", " ").replace(/\s+/g,' ').trim()
}

var getFromBetween = {
    results:[],
    string:"",

    getFromBetween:function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) {
        	return false	
        } 
        var SP = this.string.indexOf(sub1) + sub1.length
        var string1 = this.string.substr(0,SP)
        var string2 = this.string.substr(SP)
        var TP = string1.length + string2.indexOf(sub2)
        return this.string.substring(SP, TP)
    },

    removeFromBetween:function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) {
        	return false
        }
        var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2
        this.string = this.string.replace(removal,"")
    },

    getAllResults:function (sub1, sub2) {
        // first check to see if we do have both substrings
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) {
        	return	
        } 

        // find one result
        var result = this.getFromBetween(sub1, sub2)
        // push it to the results array
        this.results.push(result)
        // remove the most recently found one from the string
        this.removeFromBetween(sub1, sub2)

        // if there's more substrings
        if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1,sub2)
        } else {
        	return
        }
    },

    get:function (string, sub1, sub2) {
        this.results = []
        this.string = string
        this.getAllResults(sub1, sub2)
        return this.results
    }
};