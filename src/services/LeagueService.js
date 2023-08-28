/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 */
class LeagueService {    
    
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    
    setMatches(matches) {
        this.matches = matches;
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }


    /*****************************************
     * Helper functions for leaderboard setup 
    ****************************************** /
    
    /**
     * Returns the total points calculated from all games played by the team.
     * 
     * Win  = 3 Points
     * Tie  = 1 Point
     * Loss = 0 Points
     * 
     * @param {Array} matchList List of matches.
     * @param {String} teamName Name of the team to calculate total matches for.
     * @returns {Number} Total points.
     */
    #getMatchesPlayed(matchList, teamName) {
        var matchesPlayed = 0;
    
        for (var i = 0; i < matchList.length; i++) {
            let home = matchList[i]['homeTeam'];
            let away = matchList[i]['awayTeam'];
            let currMatch = [home, away];
            if (currMatch.includes(teamName)) matchesPlayed++;
        }
        
        return matchesPlayed;
    }

    /**
     * Returns an array of the goals scored and goals conceded by the team.
     * 
     * Array[0]: Goals scored by the team.
     * Array[1]: Goals conceded by the team.
     * 
     * @param {Array} matchList List of matches.
     * @param {String} teamName Name of the team to calculate total goals scored/conceded.
     * @returns {Array} Goals for and goals against.
     */
    #getGoals(matchList, teamName) {
        var goalsFor = 0;
        var goalsAgainst = 0;

        for (var i = 0; i < matchList.length; i++) {
            let homeTeam = matchList[i]['homeTeam'];
            let awayTeam = matchList[i]['awayTeam'];
            let currGame = [homeTeam, awayTeam];
            
            // Team played in the current game.
            if (currGame.includes(teamName)) {
                if (teamName === homeTeam) {
                    goalsFor += matchList[i]['homeTeamScore'];
                    goalsAgainst += matchList[i]['awayTeamScore'];
                } else {
                    goalsFor += matchList[i]['awayTeamScore'];
                    goalsAgainst += matchList[i]['homeTeamScore'];
                }
            }
        }
        
        return [goalsFor, goalsAgainst];
    }

    /**
     * Returns an array of the goals scored and goals conceded by the team.
     * 
     * Array[0]: Goals scored by the team.
     * Array[1]: Goals conceded by the team.
     * 
     * @param {Array} matchList List of matches.
     * @param {String} teamName Name of the team to calculate total goals scored/conceded.
     * @returns {Array} Goals for and goals against.
     */
    #getTotalPoints(matchList, teamName) {
        var pointsTotal = 0;

        for (let i = 0; i < matchList.length; i++) {
            let homeTeam  = matchList[i]['homeTeam'];
            let homeScore = matchList[i]['homeTeamScore'];
            let awayTeam  = matchList[i]['awayTeam'];
            let awayScore = matchList[i]['awayTeamScore'];
            
            // Calculate as home team.
            if (teamName === homeTeam) {
                if (homeScore > awayScore) pointsTotal += 3;
                else if (homeScore === awayScore) pointsTotal += 1;
            }
            
            // Calculate as away team.
            if (teamName === awayTeam) {
                if (homeScore < awayScore) pointsTotal += 3;
                else if (homeScore === awayScore) pointsTotal += 1;
            }
        }
        
        return pointsTotal;
    }

    /**
     * Returns a list of all teams from the schedule.
     * 
     * @param {Array} matchList List of matches.
     * @returns {Array} List of all teams in schedule.
     */
    #getTeamsList(matches) {
        var teamsList = [];
        for (let i = 0; i < matches.length; i++) {
            let homeTeam = matches[i]['homeTeam'];
            let awayTeam = matches[i]['awayTeam'];
            if (!teamsList.includes(homeTeam)) teamsList.push(homeTeam);
            if (!teamsList.includes(awayTeam)) teamsList.push(awayTeam);
        }
        
        return teamsList;
    }

    /**
     * Returns the team with more points in head-to-head games against eachother.
     * 
     * @param {String} team1 Name of first team being compared.
     * @param {String} team2 Name of second team being compared.
     * @param {array} matches List of all matches played in the tournament.
     * @returns {String || Number} Name of the country that won this tie breaker or 0 for no winner.
     */
    #compareHeadToHead(team1, team2, matches) {
        var team1Wins = 0
        var team2Wins = 0;
        
        // Find matches team1 and team2 played against eachother.
        for (let i = 0; i < matches.length; i++) {
            var homeTeam = matches[i]['homeTeam'];
            var awayTeam = matches[i]['awayTeam'];

            // Team1 is home team, team 2 is away team.
            if (team1 === homeTeam && team2 === awayTeam) {
                let team1Goals = matches[i]['homeTeamScore'];  
                let team2Goals = matches[i]['awayTeamScore'];
                (team1Goals > team2Goals) ? team1Wins++ : team2Wins++;
            } else if (team1 === awayTeam && team2 === homeTeam) {
                let team2Goals = matches[i]['homeTeamScore'];  
                let team1Goals = matches[i]['awayTeamScore'];  
                (team1Goals > team2Goals) ? team1Wins++ : team2Wins++; 
            }
        }
        // Determine who had more goals vs eachother
        if (team1Wins > team2Wins) {
            return team1;
        } else if (team1Wins < team2Wins) {
            return team2;
        } else {
            return 0;
        }
    }

    /**
     * Returns the winner of a 2-way tie-breaker.
     * 
     * Tie breaker 1: Numbers of points in head-to-head games between the 2 teams.
     * Tie breaker 2: Greater goal difference of the 2 teams in all games.
     * Tie breaker 3: Greater number of goals scored between the 2 teams in all games. 
     * Tie breaker 4: Name of the country that comes first alphabetically.
     * 
     * @param {String} team1 Name of first team being compared.
     * @param {String} team2 Name of second team being compared.
     * @param {array} matches List of all matches played in tournament.
     * @returns {String} Name of the country that won the tie breaker.
     */
    #determineTieBreaker(team1, team2, matches) {
        // Tie breaker 1, head to head wins.
        switch (this.#compareHeadToHead(team1, team2, matches)) {
            case team1:
                return team1;
                break;
            case team2:
                return team2;
                break;
            default:
                break;
        }
        
        // Tie breaker 2, goal difference comparison.
        let team1GoalDiff = this.#getGoals(this.matches, team1)[0] - this.#getGoals(this.matches, team1)[1]; 
        let team2GoalDiff = this.#getGoals(matches, team2)[0] - this.#getGoals(matches, team2)[1]; 
        if (team1GoalDiff > team2GoalDiff || team1GoalDiff < team2GoalDiff) {
            return team1GoalDiff > team2GoalDiff ? team1 : team2;
        }
        
        // Tie breaker 3, goals scored comparison.
        let team1Goals = this.#getGoals(matches, team1)[0]; 
        let team2Goals = this.#getGoals(matches, team2)[0]; 
        if (team1Goals > team2Goals || team1Goals < team2Goals) {
            return team1Goals > team2Goals ? team1 : team2;
        }
        
        // Tie breaker 4, alphabetical.
        return [team1, team2].sort()[0];
    }

    /**
     * Returns the leaderboard with teams in order from most to least points.
     * 
     * Recursive function to sort the teams based on the number of points they have.
     * @TODO Implement tie-breaker
     * 
     * @param {Array} leaderboard Unordered leaderboard.
     * @returns {Array} Sorted leaderboard for correct team standings.
     */
    #reorderLeaderboard(leaderboard) {
        var numSwaps = 0; 

        for (let i = 0; i < leaderboard.length - 1; i++) {
            let team1 = leaderboard[i]['points'];
            let team2 = leaderboard[i+1]['points'];
            
            // Team 1 has less points, go down 1 position.
            if (team1 < team2) {
                // Swap teams in leaderboard.
                let teamToMove = leaderboard.splice(i, 1)[0];
                leaderboard.splice(i+1,0,teamToMove);
                numSwaps++;
            } else if (team1 === team2) {
                let t1 = leaderboard[i]['teamName'];
                let t2 = leaderboard[i+1]['teamName'];
                let winner = this.#determineTieBreaker(t1, t2, this.matches);
                if (t2 === winner) {
                    let teamToMove = leaderboard.splice(i, 1)[0];
                    leaderboard.splice(i+1,0,teamToMove);
                    numSwaps++;
                }
            }
        }
        if (numSwaps > 0) {
            this.#reorderLeaderboard(leaderboard);
        } 
        return leaderboard;
    }


    /**
     * Sets the leaderboard. 
     * Calculates points, goals for/against, and matches played for each team.
     * 
     * The leaderboard is in the form of a list of JSON objects.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]
     * @param {Array} matches List of matches played.
     */
    setLeaderboard(matches) {
        var teams = this.#getTeamsList(this.matches);
        var leaderboard = [];
        
        for (let i = 0; i < teams.length; i++) {
            let currTeam = teams[i];
            let matchesPlayed = this.#getMatchesPlayed(matches, currTeam);
            let goalsFor = this.#getGoals(matches, currTeam)[0];
            let goalsAgainst = this.#getGoals(matches, currTeam)[1];
            let totalPoints = this.#getTotalPoints(matches, currTeam);
            leaderboard[i] = {
                'teamName': currTeam,
                'matchesPlayed': matchesPlayed,
                'goalsFor': goalsFor,
                'goalsAgainst': goalsAgainst,
                'points': totalPoints
            }
        }
        this.leaderboard = this.#reorderLeaderboard(leaderboard);
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecst.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        return this.leaderboard;
    }
    
    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData() {
        // Get API Bearer token.
        const token = await fetch('http://localhost:3001/api/v1/getAccessToken')
            .then(res => res.json())
            .then(data => {return data['access_token']});
        
        // Fetch list of matches played.
        const matchList = await fetch('http://localhost:3001/api/v1/getAllMatches', {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(res => res.json())
            .then(data => {
                
                // Parse API response and put matches into an array.
                var matches = [] 
                for (let i = 0; i < data.matches.length; i++) {
                    matches.push(data.matches[i]); 
                }  
                
                return matches;
            }); 
            
        return matchList;
    }   
}

export default LeagueService;