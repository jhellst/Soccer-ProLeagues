from dataclasses import dataclass
from bs4 import BeautifulSoup
import requests
import re


@dataclass
class TeamInfo:
    """Class to hold all info and statistics for a single soccer team."""

    # Team's display properties.
    teamName: str
    teamNameAbbrev: str
    teamCrest: str
    teamHyperlink: str

    # Team's league performance statistics.
    currentStanding: int
    gamesPlayed: int
    wins: int
    draws: int
    losses: int
    goalsFor: int
    goalsAgainst: int
    goalDifferential: int
    points: int
    # teamForm: list[str] # Return to review this and consider transforming data before storing in db.

    def __init__(self, teamInfo):

        # Display fields.
        if len(teamInfo) == 11: # teamInfo is scraped data -> needs to be processed before storing.
            currentStanding, displayInfo, gamesPlayed, wins, draws, losses, goalsFor, goalsAgainst, goalDifferential, points, teamFormFullText = teamInfo

            self.teamNameAbbrev = displayInfo.find(
                "span", class_="team-name").text.strip()
            self.teamCrest = displayInfo.find(
                "img", class_="team-crest")["src"]
            teamNameElement = displayInfo.find("a", class_="team-name__long")
            self.teamHyperlink = teamNameElement["href"]
            self.teamName = teamNameElement.text.strip()

            self.currentStanding = int(currentStanding.string)
            self.gamesPlayed = int(gamesPlayed.string)
            self.wins = int(wins.text)
            self.draws = int(draws.string)
            self.losses = int(losses.text)
            self.goalsFor = int(goalsFor.string)
            self.goalsAgainst = int(goalsAgainst.text)
            self.goalDifferential = int(goalDifferential.string)
            self.points = int(points.string)
            # print("teamInfo@soccerScraper", self.teamName, self.teamNameAbbrev, self.teamCrest, self.teamHyperlink, self.teamName, self.currentStanding, self.gamesPlayed, self.wins, self.draws, self.losses, self.goalsFor, self.goalsAgainst, self.goalDifferential, self.points)

        else: # teamInfo is data pulled from db -> can be directly stored/accessed.
            teamName, teamNameAbbrev, teamCrest, teamHyperlink, currentStanding, gamesPlayed, wins, draws, losses, goalsFor, goalsAgainst, goalDifferential, points = teamInfo

            self.teamName = teamName
            self.teamNameAbbrev = teamNameAbbrev
            self.teamCrest = teamCrest
            self.teamHyperlink = teamHyperlink
            self.currentStanding = currentStanding
            self.gamesPlayed = gamesPlayed
            self.wins = wins
            self.draws = draws
            self.losses = losses
            self.goalsFor = goalsFor
            self.goalsAgainst = goalsAgainst
            self.goalDifferential = goalDifferential
            self.points = points
            # self.teamForm = re.split(r"\s{2,}", teamFormFullText.text.strip())

    # def get_team_statistics(self):
    #     return {self}


# For current iteration, will only use 1 league: English Premier League (EPL).
URL = "https://www.theguardian.com/football/premierleague/table"


# Will need to make more dynamic to accept other URLs/Leagues.
def retrieveLeagueInfo(url):

    # Scrapes HTML data from league table at provided URL.
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html5lib")

    full_table = soup.find(
        "table", class_="table table--football table--league-table table--responsive-font table--striped")

    league_table_body = full_table.find_all("tr")[1:]
    team_infos = [i for i in league_table_body]

    teams_in_league = [TeamInfo(team.find_all("td")) for team in team_infos]
    return teams_in_league

    # For each team:
    # 1) Add the team itself to the db with display info.
    # 2) Add the team's league statistics to the db.

    # Next steps:
    # 1) Store data in PostegreSQL database -> Done
    # 2) Produce data tables and charts from database data -> In progress
    # 3) React frontend to display information, with option to toggle each league on/off and select different charting options -> Done
    # 4) Automate to update database periodically
