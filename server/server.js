require('dotenv').config()
const PORT = process.env.PORT || 8000
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const cors = require('cors');

import { GetJobObject } from './siteParser.js';

//const { GetJobObject } = jObj;

const app = express()
app.use(cors())

/* Name, Full address, base Address */
const jobSites = [

    // {
    //     name: '',       Name of the site
    //     address: '',    Specific address i.e. 'https://uk.indeed.com/jobs?q=software%20developer&l=ky1%202qw&from=searchOnHP&vjk=8d68204d6af77ae5'
    //     base: ''        Base URL of the website i.e. 'https://uk.indeed.com/'
    // },

    {
        name: 'indeed',
        address: 'https://uk.indeed.com/jobs?q=software%20developer&l=ky1%202qw&from=searchOnHP&vjk=8d68204d6af77ae5',
        base: 'https://uk.indeed.com'
    },
    {
        name: 'monster',
        address: 'https://www.monster.co.uk/jobs/search?q=software+developer&where=ky1+2qw&page=1&so=m.h.sh',
        base: 'https://www.monster.co.uk/'
    },
    {
        name: 'totaljobs',
        address: 'https://www.totaljobs.com/jobs/software-developer/in-fife?radius=10',
        base: 'https://www.totaljobs.com/'
    },
    {
        name: 'jobsite',
        address: 'https://www.jobsite.co.uk/jobs/software-developer/in-ky1-2qw?radius=10&searchOrigin=Resultlist_top-search',
        base: 'https://www.jobsite.co.uk/'
    },
    {
        name: 'reed',
        address: 'https://www.reed.co.uk/jobs/software-developer-jobs-in-fife',
        base: 'https://www.reed.co.uk/'
    },
    {
        name: 'glassdoor',
        address: 'https://www.glassdoor.co.uk/Job/edinburgh-software-developer-jobs-SRCH_IL.0,9_IC3312271_KO10,28.htm',
        base: 'https://www.glassdoor.co.uk/index.htm'
    },
    {
        name: 's1',
        address: 'https://www.cv-library.co.uk/software-developer-jobs-in-ky1-2qw?us=1',
        base: 'https://www.cv-library.co.uk'
    }
]

const jobs = []

/** Loop through each of the jobs objects and use axios to get the address URL */
jobSites.forEach(site => {
    axios
        .get(site.address)
        .then((response) => {

            const html = response.data      // Store response data
            const $ = cheerio.load(html)    // Use cheerio to parse the html data

            console.log(`Trying ${site.name}...`)   // Some visual feedback

            jobSites.push(GetJobObject(site.name, $));

            /*
            if (site.name == "indeed") {
                $('a:contains("Developer")', html).each(function () {   // Search each site for specific tags
                    const title = $(this).text()
                    const companyName = $(this).closest('.resultContent').find(".companyName").text()
                    const salary = $(this).closest('.resultContent').find(".attribute_snippet").first().text()
                    const url = $(this).attr('href')
                    const datePosted = $(this).closest('.job_seen_beacon').find("span.date").text()
                    if (!title.includes("salaries") && !title.includes("course")) {
                        jobs.push({
                            title,
                            companyName,
                            salary:  /\d/.test(salary) ? salary : 'n/a',
                            url: site.base + url,
                            posted: datePosted.replace('Posted', ''), // Prints out 'PostedPosted 3 da...', JS replace() only replaces first instance of pattern
                            source: site.name
                        })
                    }
                })
            }

            if (site.name == "monster") {
                $('[data-test-id~="svx-job-title"]', html).each(function () {
                    const title = $('job-cardstyle__JobCardTitle-sc-1mbmxes-2 hwZGwa').text()
                    const url = $(this).attr('href')
                    const salary = ''
                    if (!title.includes("salaries") && !title.includes("course")) {
                        jobs.push({
                            title,
                            companyName: '',
                            salary:  /\d/.test(salary) ? salary : 'n/a',
                            url: site.base + url,
                            datePosted: '',
                            source: site.name
                        })
                    }
                })
            }

            if (site.name == "s1") {
                $('a[title*="Developer"]', html).each(function () {
                    const title = fTitle($(this).text())
                    const companyName = $(this).closest('.job__main').find(".job__posted-row").find(".job__company-link").text()
                    const salary = $(this).closest('.job__main').find("dd").first().text().trim()
                    const datePosted = $(this).closest('.job__main').find(".job__posted-by").find("span").text()
                    const url = $(this).attr('href')
                    if (!title.includes("salaries") && !title.includes("course")) {
                        jobs.push({
                            title,
                            companyName,
                            salary:  /\d/.test(salary) ? salary : 'n/a',
                            url: site.base + url,
                            datePosted,
                            source: site.name
                        })
                    }
                })
            }

            if (site.name == "glassdoor") {
                $('a[data-test*="job-link"]', html).each(function () {
                    const title = $(this).text()
                    const companyName = $(this).closest("div").find("span").first().text()
                    const url = $(this).attr('href')
                    const datePosted = $(this).closest("div").find("div").find("div").find("div").text()   // wtf
                    if (!title.includes("salaries") && !title.includes("course")) {
                        jobs.push({
                            title,
                            companyName,
                            url: site.base + url,
                            datePosted: datePosted.replace(/\D/g, '').length < 3 ? datePosted.replace(/\D/g, '') : '',
                            source: site.name
                        })
                    }
                })
            }

            if (site.name == "reed") {
                $('.gtmJobTitleClickResponsive', html).each(function () {
                    const title = fTitle($(this).html())
                    const companyName = $(this).closest('.job-result-heading').find(".gtmJobListingPostedBy").text()
                    const salary = $(this).closest('.job-result-heading').next("ul").find("li").first().text().toLowerCase()
                    const datePosted = $(this).closest('.job-result-heading').find("div.job-result-heading__posted-by").text()
                    const url = $(this).attr('href') 

                    if (!title.includes("salaries") && !title.includes("course")) {
                        jobs.push({
                            title,
                            companyName,
                            salary:  /\d/.test(salary) ? salary : salary.includes("competitive") ? salary : '(No salary shown)', // If salary has not been given then tell user, otherwise show salary, even 'competitive'
                            url: site.base + url,
                            datePosted: datePosted.trim().split(' ').slice(0, 2).join(' '),
                            source: site.name
                        })
                    }      
                })
            }*/
        }).catch(err => console.log(err))
})

app.get('/', (req, res) => {    // Home page
    res.json('Welcome to my Job News API')
})

app.get('/jobs', (req, res) => {    // Route for `/jobs` => returns JSON response with JavaScript array of Job objects
    res.json(jobs)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))   // Server starting point. Listens on {PORT}

/** Remove line breaks and empty space from the titles */
function fTitle(title) {
    let formattedTitle = title.replace(/\\n/g, '').trim()
    if (formattedTitle == "") return "(No title shown)"
    return formattedTitle
}

/*

 --> Code for getting no. of days since listing was posted. 

*** Does not work correctly -> UK date system ddMMyyyy does not work with this

-----------------------------------------------------------------------------------

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


*/