// Helper file contains useful functions

function fTitle(title) {    // Formats job titles scraped from the Web
    let formattedTitle = title.replace(/\\n/g, '').trim()
    if (formattedTitle == "") return "(No title shown)"
    return formattedTitle
}

module.exports = { fTitle };
