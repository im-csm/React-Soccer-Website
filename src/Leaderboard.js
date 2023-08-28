import "./Styles/leaderboard.css";
import LeagueService from "./services/LeagueService";
import {useEffect} from 'react';

async function buildLeaderboard() {
  const worker = new LeagueService();
  await worker.fetchData().then(res => {
    worker.setMatches(res);
    worker.setLeaderboard(res);
  })

  var leaderboard = worker.getLeaderboard() 
  // console.log(leaderboard);
  var tableBody = document.getElementById('leaderboard-body');  // Entire table

  for (let i = 0; i < leaderboard.length; i++) {
    let tableRow = document.createElement('tr');  // Row for data
    let goalDiff = leaderboard[i]['goalsFor'] - leaderboard[i]['goalsAgainst'];
    const teamData = {
      'name': leaderboard[i]['teamName'],
      'matchesPlayed': leaderboard[i]['matchesPlayed'],
      'goalsFor': leaderboard[i]['goalsFor'],
      'goalsAgainst': leaderboard[i]['goalsAgainst'],
      'goalDiff': goalDiff,
      'points': leaderboard[i]['points']
    }
    let idList = {
      'name': "name-span",
      'matchesPlayed': "",
      'goalsFor': "no-mobile",
      'goalsAgainst': "no-mobile",
      'goalDiff': "mobile-only",
      'points': ""
    };
    
    // Create the team name/flag HTML concoction
    let countryData = document.createElement('td'); // td container for name/flag
    countryData.setAttribute('id','name');
    var teamFlag = document.createElement('img');
    teamFlag.className = 'flag';
    teamFlag.setAttribute('id', 'country-flag');
    teamFlag.src = `https://flagsapi.codeaid.io/${teamData['name']}.png`; 
    var countryName = document.createElement('span');
    countryName.setAttribute('id', 'name-span');
    countryName.innerText = (teamData['name']); 
    
    // Append country name/flag to their <td> tag.
    countryData.append(teamFlag);
    countryData.append(countryName);
    tableRow.append(countryData);
    
    var mp = document.createElement('td')
    mp.innerText = (teamData['matchesPlayed']);
    tableRow.append(mp);
    
    // Handle rest of info for team
    var gf = document.createElement('td');
    gf.innerText = (teamData['goalsFor']);
    gf.setAttribute('class','no-mobile');
    tableRow.append(gf);

    
    var ga = document.createElement('td');
    ga.innerText = (teamData['goalsAgainst']);
    ga.setAttribute('class','no-mobile');
    tableRow.append(ga);
    
    var gd = document.createElement('td');
    gd.innerText = (teamData['goalDiff']);
    gd.setAttribute('class','mobile-only');
    tableRow.append(gd);
    
    var pts = document.createElement('td');
    pts.innerText = (teamData['points']);
    pts.setAttribute('class', 'blue-bold')
    tableRow.append(pts);
    
    tableBody.append(tableRow);
  }
}

function Leaderboard() {
  useEffect(() => {
    buildLeaderboard();
  });

  return (
    <div className="page-wrapper">
      <div id="page-heading">
        League Standings
      </div>
      <div className="leaderboard-table-wrapper">
        <table>
          <thead id="leaderboard-head">
            <tr>
              <th id="name" className="">Team Name</th>
              <th className="" >MP</th>
              <th className="no-mobile">GF</th>
              <th className="no-mobile">GA</th>
              <th className="mobile-only">GD</th>
              <th className="" >Points</th>
            </tr>
          </thead>
          <tbody id="leaderboard-body">
            {/* <tr>
              <td id="name" className="">
                <img id="country-flag"  className="flag" src="https://flagsapi.codeaid.io/Brazil.png" />
                <span id="name-span">Name</span>
              </td>
              <td id="mp">MP</td>
              <td id="gf" className="no-mobile">GF</td>
              <td id="ga" className="no-mobile">GA</td>
              <td id="gd" className="mobile-only">GD</td>
              <td id="pts">Pts</td>
            </tr>
            <tr>
              <td id="name" className="">
                <img id="country-flag"  className="flag" src="https://flagsapi.codeaid.io/Brazil.png" />
                <span id="name-span">Name</span>
              </td>
              <td id="mp">MP</td>
              <td id="gf" className="no-mobile">GF</td>
              <td id="ga" className="no-mobile">GA</td>
              <td id="gd" className="mobile-only">GD</td>
              <td id="pts">Pts</td>
            </tr>
            <tr>
              <td id="name" className="">
                <img id="country-flag"  className="flag" src="https://flagsapi.codeaid.io/Brazil.png" />
                <span id="name-span">Name</span>
              </td>
              <td id="mp">MP</td>
              <td id="gf" className="no-mobile">GF</td>
              <td id="ga" className="no-mobile">GA</td>
              <td id="gd" className="mobile-only">GD</td>
              <td id="pts">Pts</td>
            </tr>
            <tr>
              <td id="name" className="">
                <img id="country-flag" className="flag" src="https://flagsapi.codeaid.io/Brazil.png" />
                <span id="name-span">Name</span>
              </td>
              <td id="mp">MP</td>
              <td id="gf" className="no-mobile">GF</td>
              <td id="ga" className="no-mobile">GA</td>
              <td id="gd" className="mobile-only">GD</td>
              <td id="pts">Pts</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard