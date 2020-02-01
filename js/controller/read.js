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
			$('#overlay').fadeOut()
			$("#error-alert").show()
			document.getElementById("error-alert").innerHTML = reason.message
			
			console.error(reason)
		})

		function getText(typedarray) {
			var pdf = PDFJS.getDocument(typedarray)
			
			pdf.onPassword = function passwordNeeded(updateCallback, reason) {
				savedUpdateCallback = updateCallback;
				var pass = document.getElementById("password").value
				savedUpdateCallback(pass)
			};

			return pdf.then(function(pdf) {
				var maxPages = pdf.pdfInfo.numPages;
				var countPromises = []

				if (isUniqueNote()) {
					for (var j = 1; j <= maxPages; j++) {
						var page = pdf.getPage(j)

						var txt = ""
						countPromises.push(page.then(function(page) {
							var textContent = page.getTextContent()

							return textContent.then(function(text) {
								return text.items.map(function(s) {
									return s.str
								}).join('') 
							})
						}))
					}
				} else {
					countPromises = readLastPage(maxPages, pdf)
				}

				return Promise.all(countPromises).then(function(texts) {
					return texts.join('')
				})
			})
		}
	}
	fileReader.readAsArrayBuffer(file)
}

function readLastPage(maxPages, pdf) {
	var countPromises = []
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
	return countPromises
}