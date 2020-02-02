function exportToPDF() {    
    var pdf = new jsPDF('p', 'pt', 'a4')
    var source = $('#tables')[0]

    specialElementHandlers = {
        '#bypassme': function(element, renderer) {
            return true
        }
    }

    // altera o html exportar o pdf
    $("#resumeTable").css("font-size", "8px")
    $("#resultTable").css("font-size", "8px")

    let marginLeft = 20
    let marginTop = 20
    
    pdf.fromHTML(source, marginLeft, marginTop, { 'elementHandlers': specialElementHandlers },
    function(dispose) {
        pdf.save('calculadora-de-ir.pdf')
    })

    // altera de volta o html apos exportar o pdf
    $("#resumeTable").css("font-size", "14px")
    $("#resultTable").css("font-size", "14px")
}

function exportToExcel() {
    
    // var dataType = 'application/vnd.ms-excel'
    // var tableSelect = document.getElementById("resumeTable")
    // var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20')

    // var downloadLink = document.createElement("a")
    // document.body.appendChild(downloadLink)
    
    // if (navigator.msSaveOrOpenBlob) {
    //     var blob = new Blob(['\ufeff', tableHTML], {
    //         type: dataType
    //     })
    //     navigator.msSaveOrOpenBlob(blob, filename)
    // } else {
    //     downloadLink.href = 'data:' + dataType + ', ' + tableHTML
    //     downloadLink.download = 'calculadora-de-ir.xls'
    //     downloadLink.click()
    // }
}