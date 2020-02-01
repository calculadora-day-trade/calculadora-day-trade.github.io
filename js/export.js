function exportToPDF() {
    $("#body-summary").css("display", "none")
    
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
    // 

    let marginLeft = 20
    let marginTop = 20
    
    pdf.fromHTML(source, marginLeft, marginTop, { 'elementHandlers': specialElementHandlers },
    
    function(dispose) {
        pdf.save('calculadora-de-ir.pdf')
    })

    // altera de volta o html apos exportar o pdf
    $("#resumeTable").css("font-size","14px")
    $("#resultTable").css("font-size", "14px")
    // $("#body-summary").show()
}