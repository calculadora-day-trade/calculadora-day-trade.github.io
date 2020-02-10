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
    var csv1 = tableToCSV(document.getElementById("resultTable"))
    var csv2 = tableToCSV(document.getElementById("resumeTable"))
    var blob = new Blob([csv1, csv2], { type: "text/csv" })
   
    downloadAnchor(URL.createObjectURL(blob))  
}

function tableToCSV(table) {
    var slice = Array.prototype.slice
    return getRow(slice, table)
}

function getRow(slice, table) {
    var value = slice.call(table.rows).map(function(row) {
        return getCell(slice, row, table.rows.length - 1)
    })
    return value.join("\r\n")
}

function getCell(slice, row, totalRow) {
    var value = slice.call(row.cells).map(function(cell) {
        return '"t"'.replace("t", cell.textContent)
    })

    console.log("Total de linhas: " + totalRow)
    console.log("Linha atual: " + row.rowIndex)

    // if (totalRow == row.rowIndex) {
        // return value.join("\r\n")
    // } else {
    return value.join(",")
    // }
}

function downloadAnchor(content) {
    var anchor = document.createElement("a")
    anchor.style = "display:none !important"
    anchor.id = "downloadanchor"
    document.body.appendChild(anchor)

    if ("download" in anchor) {
        anchor.download = "calculadora-de-ir.csv"
    }

    anchor.href = content
    anchor.click()
    anchor.remove()
}


