/**
 * Metodo responsavel por analisar o pdf
 * @param text String
 */
function analyse(text) {
	var finalString = removeExtraSpaces(text)
	console.log(finalString)

	if (finalString.includes("TERRA")) {
		return analyseTerraCorretora(finalString)

	} else if (finalString.includes("CLEAR")) {
		return analyseClearCorretora(finalString)
		
	} else if (finalString.includes("RICO") || finalString.includes("Rico Investimentos")) {
		return analyseRicoCorretora(finalString)
	
	} else if (finalString.includes("XP INVESTIMENTOS")) {
		return analyseXPCorretora(finalString)
	
	} else if (finalString.includes("MODAL DTVM")) {
		return analyseModalCorretora(finalString)
	}
}
