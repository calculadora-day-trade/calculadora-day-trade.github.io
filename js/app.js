var resultPDF

function readFile(input) {
	for (i = 0; i < input.files.length; i++) {
		readPDF(input.files[i])
		console.log(resultPDF)
		console.log("################")
	}
}

/**
 * Metodo que exibe um dialog com uma mensagem de erro
 * @param text String
 */
function showDialog(text) {
	var dialog = $('#validateModal');
	dialog.find('.modal-body p').text(text);
	dialog.modal('show');
}

/**
 * Metodo que esconde varios componentes quando carrega a tela
 */
function onLoadScreen() {
	$("#successAlert").hide();
	$("#errorAlert").hide();
	$(".progress").hide();
	$("#resultTable").hide();
}