var cache = false

/**
 * Metodo que le o pdf anexado
 * @param input Files
 */
function readFile(input) {
	var isValid = validadeInput(input.files)

	if (cache) {
		$("#resultTable tr").remove();
		$("#resumeTable tr").remove();
	} else {
		cache = true
	}

	if (isValid != "") {
		$("#errorAlert").show()
		document.getElementById("errorAlert").innerHTML = isValid

	} else {
		startReadFile(input.files)
	}
}

/**
 * Metodo responsavel por começar a leitura do pdf
 * @param input Files
 */
function startReadFile(files) {
	$("#errorAlert").hide()
	$('#overlay').fadeIn()

	var listLength = files.length
	var model = []
	var count = 0

	for (i = 0; i < listLength; i++) {
		readPDF(files[i], function(text) {
			count++

			model.push(analyse(text))
			if (count == listLength) {
				printModel(model)
			}
		})
	}
}

/**
 * Metodo responsavel em validar o anexo
 * @param input Files
 */
function validadeInput(files) {
	var isValid = ""

	if (files.length > 30) {
		isValid = "Número máximo de arquivos suportados."

	} else {
		for (i = 0; i < files.length; i++) {
			if (files[i].type != "application/pdf") {
				isValid = "Formato de arquivo incorreto."
				break

			} else if ((files[i].size / 1000) > 500) {
				isValid = "Tamanho do arquivo maior que o máximo permitido."
			}
		}
	}
	return isValid
}

/**
 * Metodo responsavel por exibir as informaçoes na tabela
 * @param text Array[Model]
 */
function printModel(model) {
	$("#resume").show()
	$("#result").show()

	model.sort(compare)

 	$.each(model, function (index, m) {
 		var nTr = "<tr style='background-color: #F4D6D5' !important>"
 		if (m.gain) {
 			nTr = "<tr style='background-color: #D5F4E6' !important>"
 		}
        
        nTr += "<td>" + m.date + "</td>"
        nTr += "<td>" + m.noteNumber + "</td>"
        nTr += "<td>" + m.grossValue + "</td>"
        nTr += "<td>" + m.totalFees + "</td>"
        nTr += "<td>" + m.totalIRRF + "</td>"
        nTr += "<td>" + m.netValue + "</td>"
        nTr += "</tr>"

        $(nTr).appendTo('#resumeTable')
    })

    printResult(model)
}

/**
 * Metodo responsavel por exibir as informaçoes na tabela
 * @param text Array[Model]
 */
function printResult(model) {
	var result = [calculate(model)]

	$.each(result, function (index, r) {
 		var nTr = "<tr style='background-color: #d5f3f4' !important>"
        
        nTr += "<td>" + format(r.grossValue) + "</td>"
        nTr += "<td>" + format(r.totalFees) + "</td>"
        nTr += "<td>" + format(r.totalIRRF) + "</td>"
        nTr += "<td>" + format(r.total) + "</td>"
        nTr += "</tr>"

        $(nTr).appendTo('#resultTable')
    })

	$('#overlay').fadeOut()
}

/**
 * Metodo que esconde varios componentes quando carrega a tela
 */
function onloadScreen() {
	$("#errorAlert").hide()
	$("#resume").hide()
	$("#result").hide()
}