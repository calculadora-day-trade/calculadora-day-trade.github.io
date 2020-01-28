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
		
	} else if (finalString.includes("RICO")) {
		return analyseRicoCorretora(finalString)
	}
}
