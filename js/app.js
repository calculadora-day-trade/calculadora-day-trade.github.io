/**
 * Metodo que le o pdf anexado
 * @param input Files
 */
function readFile(input) {
	for (i = 0; i < input.files.length; i++) {
		readPDF(input.files[i], function(text) {
			var model = [analyse(text)]
			print(model)
		});
	}
}

/**
 * Metodo responsavel por carregar as informaçoes na tabela
 * @param text Array[Model]
 */
function print(model) {
	$("#resultTable").show()

 	$.each(model, function (index, m) {
        var nTr = "<tr>"
        nTr += "<td><p>" + m.date + "</p></td>"
        nTr += "<td><p>" + m.noteNumber + "</p></td>"
        nTr += "<td><p>" + m.grossValue + "</p></td>"
        nTr += "<td><p>" + m.totalIRRF + "</p></td>"
        nTr += "<td><p>" + m.totalFees + "</p></td>"
        nTr += "<td><p>" + m.netValue + "</p></td>"
        nTr += "</tr>"

        $(nTr).appendTo('#resultTable')
    })
}

/**
 * Metodo que exibe um dialog com uma mensagem de erro
 * @param text String
 */
function showDialog(text) {
	var dialog = $('#validateModal')
	dialog.find('.modal-body p').text(text)
	dialog.modal('show')
}

/**
 * Metodo que esconde varios componentes quando carrega a tela
 */
function onloadScreen() {
	$("#successAlert").hide()
	$("#errorAlert").hide()
	$(".progress").hide()
	$("#resultTable").hide()
}