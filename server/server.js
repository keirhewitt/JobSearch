require('dotenv').config()
const PORT = 8000
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const cors = require('cors');


const sParser = require('./siteParser.js'); // Scrapes each website and returns data

const app = express()   // Middleware for parsing responses as JSON
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

// Loop through each of the jobs objects and use axios to get the address URL
jobSites.forEach(site => {
    axios
        .get(site.address)
        .then((response) => {

            const html = response.data      // Store response data
            const $ = cheerio.load(html)    // Use cheerio to parse the html data

            console.log(`Trying ${site.name}...`)   // Some visual feedback

            jobSites.push(sParser.GetJobObject(site.name, $, html));
        }).catch(err => console.log(err))
})

app.get('/', (req, res) => {    // Home page
    res.json('Welcome to my Job News API')
})

app.get('/jobs', (req, res) => {    // Route for `/jobs` => returns JSON response with JavaScript array of Job objects
    res.json(jobs)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))   // Server starting point. Listens on {PORT}
