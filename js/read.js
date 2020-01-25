/**
 * Metodo que le o pdf anexado, e retorna com o texto do PDF
 * @param input Files
 * @param callback
 */
function readPDF(file, callback) {
	var fileReader = new FileReader()

	fileReader.onload = function() {
		var typedarray = new Uint8Array(this.result);

		getText(typedarray).then(function(text) {
			callback(text);
		}, function(reason) {
			alert('Aconteceu alguma coisa de errado')
			console.error(reason)
		})

		function getText(typedarray) {
			var pdf = PDFJS.getDocument(typedarray)
			
			return pdf.then(function(pdf) {
				var maxPages = pdf.pdfInfo.numPages;
				var countPromises = []

				// for (var j = 1; j <= maxPages; j++) {
					var page = pdf.getPage(maxPages)

					var txt = ""
					countPromises.push(page.then(function(page) {
						var textContent = page.getTextContent()

						return textContent.then(function(text) {
							return text.items.map(function(s) {
								return s.str
							}).join('') 
						})
					}))
				// }

				return Promise.all(countPromises).then(function(texts) {
					return texts.join('')
				})
			})
		}
	}
	fileReader.readAsArrayBuffer(file)
}