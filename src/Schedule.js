import './Styles/schedule.css';
import LeagueService from "./services/LeagueService";
import {useEffect} from 'react';

/* 
 * Builds the schedule from the matches array.
 * 
 * 1. Uses leagueService to retrieve the matches array.
 * 2. Uses matches list to pull data about each match.
 * 3. Creates table rows for each match in the match array.
*/
async function buildSchedule() {
  const worker = new LeagueService();
  await worker.fetchData().then(res => worker.setMatches(res));
  var matches = worker.getMatches();

  var tableBody = document.getElementById("schedule-body");
  
  // Loop through matches, gather data, create table rows.
  for (let i = 0; i < matches.length; i++) {
    let tableRow = document.createElement('tr');
    let matchData = {
      'date': "5.5.2022\n11:50",
      'stadium': matches[i]['stadium'],
      'homeTeam': matches[i]['homeTeam'],
      'score': matches[i]['homeTeamScore'] + " : " + matches[i]['awayTeamScore'],
      'awayTeam': matches[i]['awayTeam']
    };
    let classList = {
      'date': "date-time right-align remove-second",
      'stadium': "stadium left-align remove-first",
      'homeTeam': "",
      'score': "score",
      'awayTeam': ""
    };

    // Create the rows for the table.
    for (let key in matchData) {
      let tableData = document.createElement('td');
      
      // Create team name/flag combo.
      switch (key) {

        // Home team data.
        case "homeTeam":
          // Create team name/flag container div.
          var divHomeTeam = document.createElement('div');
          divHomeTeam.className = 'home-team';
          
          // Set team name into span.
          var spanHomeTeamName = document.createElement('span');
          spanHomeTeamName.setAttribute('id', 'team-name');
          spanHomeTeamName.innerText = matchData[key];
          divHomeTeam.appendChild(spanHomeTeamName); 
          
          // Create image element and get country flag.
          var imgHomeTeamFlag = document.createElement('img');
          imgHomeTeamFlag.className = 'flag';
          imgHomeTeamFlag.src=`https://flagsapi.codeaid.io/${matchData[key]}.png`;
          divHomeTeam.appendChild(imgHomeTeamFlag);

          // Add HTML concoction to table row.
          tableData.appendChild(divHomeTeam);
          tableRow.appendChild(tableData);
          break;

        // Away team data
        case "awayTeam":
          // Create team name/flag container div.
          var divAwayTeam = document.createElement('div');
          divAwayTeam.className = 'away-team';
          
          // Create image element and get country flag.
          var imgAwayTeamFlag = document.createElement('img');
          imgAwayTeamFlag.className = 'flag';
          imgAwayTeamFlag.src=`https://flagsapi.codeaid.io/${matchData[key]}.png`;
          divAwayTeam.appendChild(imgAwayTeamFlag);
          
          // Set team name into span.
          var spanAwayTeamName = document.createElement('span');
          spanAwayTeamName.setAttribute('id', 'team-name');
          spanAwayTeamName.innerText = matchData[key];
          divAwayTeam.appendChild(spanAwayTeamName);

          // Add HTML concoction to table row.
          tableData.appendChild(divAwayTeam);
          tableRow.appendChild(tableData);
          break;

        // Other data not related to team name/flag combo.
        default:
          tableData.innerText = matchData[key];
          tableData.className = classList[key];
          tableRow.appendChild(tableData); 
      }
    }
    tableBody.appendChild(tableRow); 
  }
}

function Schedule() {
  // Call schedule creator once per page load.
  useEffect( () => {
    buildSchedule();
  });

  return (
    <div className="page-wrapper">
      <div id="page-heading">
        League Schedule
      </div>
      <div className="table-wrapper">
        <table>
          <thead id="schedule-head">
            <tr>
              <th className="right-align remove-second">    Date/Time </th>
              <th className="stadium left-align remove-first">Stadium</th>
              <th className="right-align">     Home Team</th>
              <th className="score">                    </th>
              <th className="left-align">      Away Team </th>
            </tr>
          </thead>
          <tbody id="schedule-body">
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule