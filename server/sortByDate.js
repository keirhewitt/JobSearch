// TODO: Get this working with UK dates
// TODO: Implement in server.js

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

let today = new Date();

const dates = [
    "11 days ago",                  // #2 - index 0 
    "26/04/2022",                   // #4 - index 1
    "Posted 13 days ago by Fintech",// #3 - index 2
    "01/08/2022",                   // #1 - index 3
    "12/12/2021",                   // #6 - index 4
    "01/03/2022"                    // #5 - index 5
]

// Takes date of any format and returns a number of days to determine the closest
// Shortest amount is 1
function parseDate(date) {
    if (date.includes("/")) {
        return mmDDyyFormat(date);
    } else if (date.includes("hours")) {
        return 1;
    } else if (date.includes("days")) {
        return parseInt(date.replace(/\D/g, ''));
    } else {
        console.log(`Didn't know what to do with ${date}`);
    }
}

function mmDDyyFormat(date1) {
    var dateFrom = new Date(date1).toLocaleDateString()
    let td = today.now().toLocaleDateString()
    console.log(`${td} - ${dateFrom}`)
    const diffTime = Math.abs(td - dateFrom);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays
}


let results = []

dates.map((date) => (
    results.push(
        date,
        mmDDyyFormat(date)
    )
))

console.log(results);