var cache = false

/**
 * Metodo que le o pdf anexado
 * @param input Files
 */
function readFile(input) {
	var isValid = validadeInput(input.files)
	
	if (cache) {
		onloadScreen()
		$("#resultTable tr#columnResultID").remove();
		$("#resumeTable tr#columnResumeID").remove();
	} else {
		cache = true
	}

	if (isValid != "") {
		$("#error-alert").show()
		document.getElementById("inputGroupFile04").value = "";
		document.getElementById("error-alert").innerHTML = isValid

	} else {
		startReadFile(input.files)
	}
}

/**
 * Metodo responsavel por começar a leitura do pdf
 * @param input Files
 */
function startReadFile(files) {
	$("#error-alert").hide()
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

	var uniqueNoteSelected = document.getElementById("radio-button-yes").checked

	if (files.length > 30) {
		isValid = "Número máximo de arquivos suportados."

	} else if (uniqueNoteSelected && files.length > 1) {
		isValid = "Não é possivel anexar mais que uma nota de corretagem quando a opção Nota Única está selecionada."

	} else {
		for (i = 0; i < files.length; i++) {
			if (files[i].type != "application/pdf") {
				isValid = "Formato de arquivo incorreto."
				break

			} else if (!uniqueNoteSelected) {
				if ((files[i].size / 1000) > 500) {
					isValid = "Tamanho do arquivo maior que o máximo permitido."
				}
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
 		var nTr = "<tr id='columnResumeID' style='background-color: #F4D6D5' !important>"
 		if (m.gain) {
 			nTr = "<tr id='columnResumeID' style='background-color: #D5F4E6' !important>"
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
 		var nTr = "<tr id='columnResultID' style='background-color: #d5f3f4' !important>"
        
        nTr += "<td>" + format(r.grossValue) + "</td>"
        nTr += "<td>" + format(r.totalFees) + "</td>"
        nTr += "<td>" + format(r.totalIRRF) + "</td>"
        nTr += "<td>" + format(r.total) + "</td>"
        nTr += "<td>" + format(r.ir) + "</td>"
        nTr += "</tr>"

        $(nTr).appendTo('#resultTable')
    })

	$('#overlay').fadeOut()
}

/**
 * Metodo que esconde varios componentes quando carrega a tela
 */
function onloadScreen() {
	$("#error-alert").hide()
	$("#resume").hide()
	$("#result").hide()
}