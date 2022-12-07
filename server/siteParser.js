import { fTitle } from './helper.js';


export function GetJobObject(sitename, cheerio_obj) {

    if (sitename == "indeed") {
        cheerio_obj('a:contains("Developer")', html).each(function () {   // Search each site for specific tags
            const title = $(this).text()
            const companyName = $(this).closest('.resultContent').find(".companyName").text()
            const salary = $(this).closest('.resultContent').find(".attribute_snippet").first().text()
            const url = $(this).attr('href')
            const datePosted = $(this).closest('.job_seen_beacon').find("span.date").text()
            if (!title.includes("salaries") && !title.includes("course")) {
                return({
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

    if (sitename == "monster") {
        cheerio_obj('[data-test-id~="svx-job-title"]', html).each(function () {
            const title = $('job-cardstyle__JobCardTitle-sc-1mbmxes-2 hwZGwa').text()
            const url = $(this).attr('href')
            const salary = ''
            if (!title.includes("salaries") && !title.includes("course")) {
                return({
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

    if (sitename == "s1") {
        cheerio_obj('a[title*="Developer"]', html).each(function () {
            const title = fTitle($(this).text())
            const companyName = $(this).closest('.job__main').find(".job__posted-row").find(".job__company-link").text()
            const salary = $(this).closest('.job__main').find("dd").first().text().trim()
            const datePosted = $(this).closest('.job__main').find(".job__posted-by").find("span").text()
            const url = $(this).attr('href')
            if (!title.includes("salaries") && !title.includes("course")) {
                return({
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

    if (sitename == "glassdoor") {
        cheerio_obj('a[data-test*="job-link"]', html).each(function () {
            const title = $(this).text()
            const companyName = $(this).closest("div").find("span").first().text()
            const url = $(this).attr('href')
            const datePosted = $(this).closest("div").find("div").find("div").find("div").text()   // wtf
            if (!title.includes("salaries") && !title.includes("course")) {
                return({
                    title,
                    companyName,
                    url: site.base + url,
                    datePosted: datePosted.replace(/\D/g, '').length < 3 ? datePosted.replace(/\D/g, '') : '',
                    source: site.name
                })
            }
        })
    }

    if (sitename == "reed") {
        cheerio_obj('.gtmJobTitleClickResponsive', html).each(function () {
            const title = fTitle($(this).html())
            const companyName = $(this).closest('.job-result-heading').find(".gtmJobListingPostedBy").text()
            const salary = $(this).closest('.job-result-heading').next("ul").find("li").first().text().toLowerCase()
            const datePosted = $(this).closest('.job-result-heading').find("div.job-result-heading__posted-by").text()
            const url = $(this).attr('href') 

            if (!title.includes("salaries") && !title.includes("course")) {
                return({
                    title,
                    companyName,
                    salary:  /\d/.test(salary) ? salary : salary.includes("competitive") ? salary : '(No salary shown)', // If salary has not been given then tell user, otherwise show salary, even 'competitive'
                    url: site.base + url,
                    datePosted: datePosted.trim().split(' ').slice(0, 2).join(' '),
                    source: site.name
                })
            }      
        })
    }
}