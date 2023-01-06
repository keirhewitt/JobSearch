
import React, { useEffect, useState } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";
import './App.css'

function App() {
  const [data, setData] = useState([])  // Init empty array for job data objects to be passed to

  async function fetchAPIData(uri) {  
    const data = await fetch(uri);
    console.log('\n\n\n\n\n\n\n\n\n')
    console.log(data);
    console.log('\n\n\n\n\n\n\n\n\n')
    return data;
  }

  /** On page load */
  useEffect(() => {
    fetchAPIData('http://192.168.56.1:3000/jobs') // Fetch api/jobs through proxy
      .then((res) => res.json())        // Convert response to JSON
      .then((res) => {
        setData(res)                    // Store JSON response in data array
      })
  }, [])

  return (
    data.length < 1 ?   // If no data returned yet

    // Loading screen while there has been no data gathered from the back-end
    <div>
      <div style={{display: "flex", margin: "auto", justifyContent: "center", alignItems: "center", height: "250px"}}>
        <PacmanLoader size={45} />
      </div>
      <div style={{display: "flex", margin: "auto", justifyContent: "center", alignItems: "center", height: "30px", verticalAlign: "middle"}}>
        <h1 style={{marginLeft: "60px"}}>Loading...</h1>
      </div>
    </div>

    :

    <div className="main-page">
      {data.map((job) => (

        <div className="app-jobs">
          <th><p className="job-title">{job.title}</p></th>    
          <tr><p className="job-company">{job.companyName}</p></tr>    
          <td><p className="job-salary">{job.salary}</p></td>
          <td><p className="job-source"><Img source={job.source}></Img></p></td>
          <td><p className="job-url"><button type="button" class="url-btn"><a href={job.url} target="_blank" rel="noreferrer">Go to Job</a></button></p></td>
        </div>
       
      ))}
    </div>

  );
}

/** Returns the image path based on the name of the job source given */
function Img({ source }) {
  switch (source) {
    case 'indeed': return <img id="source-img" src={require("./images/indeed.png")} alt=""></img>
    case 'reed': return <img id="source-img" src={require("./images/reed.png")} alt=""></img>
    case 's1': return <img id="source-img" src={require("./images/s1jobs.png")} alt=""></img>
    case 'glassdoor': return <img id="source-img" src={require("./images/glassdoor.png")} alt=""></img>
    case 'monster': return <img id="source-img" src={require("./images/monster.png")} alt=""></img>
    default: return null
  }
}

export default App;
