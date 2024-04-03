from app import db
# from models import db, Team, League, StatisticsForLeague
from models import User, Team, League, StatisticsForLeague, LeaguesFollowedByUser, TeamsFollowedByUser
from soccerScraper import retrieveLeagueInfo
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

db.drop_all()
db.create_all()

# Add Sample User(s)
hashed_pwd_1 = bcrypt.generate_password_hash("a").decode('UTF-8')
hashed_pwd_2 = bcrypt.generate_password_hash("b").decode('UTF-8')
user_1 = User(username="a", password=hashed_pwd_1)
user_2 = User(username="b", password=hashed_pwd_2)
db.session.add_all([user_1, user_2])

# Add Sample League(s)
epl = League(league_name='English Premier League', league_country='England', league_description='English First Division Professional Soccer League',
             league_url="https://www.theguardian.com/football/premierleague/table")
bundesliga = League(league_name='Bundesliga', league_country='Germany', league_description='German First Division Professional Soccer League',
                    league_url="https://www.theguardian.com/football/bundesligafootball/table")
serie_a = League(league_name='Serie A', league_country='Italy', league_description='Italian First Division Professional Soccer League',
                 league_url="https://www.theguardian.com/football/serieafootball/table")
la_liga = League(league_name='La Liga', league_country='Spain', league_description='Spanish First Division Professional Soccer League',
                 league_url="https://www.theguardian.com/football/laligafootball/table")
ligue_1 = League(league_name='Ligue 1', league_country='France', league_description='French First Division Professional Soccer League',
                 league_url="https://www.theguardian.com/football/ligue1football/table")
scottish_premiership = League(league_name='Scottish Premiership', league_country='Scotland', league_description='Scottish First Division Professional Soccer League',
                              league_url="https://www.theguardian.com/football/scottish-premiership/table")
english_championship = League(league_name='English Championship', league_country='England', league_description='English Second Division Professional Soccer League',
                              league_url="https://www.theguardian.com/football/championship/table")
english_league_one = League(league_name='English League One', league_country='England', league_description='English Third Division Professional Soccer League',
                            league_url="https://www.theguardian.com/football/leagueonefootball/table")
# english_league_two = League(league_name='English League Two',
#                             league_url="https://www.theguardian.com/football/leaguetwofootball/table")
# scottish_championship = League(league_name='Scottish Championship',
#                                league_url="https://www.theguardian.com/football/scottish-championship/table")
# scottish_league_one = League(league_name='Scottish League One',
#                              league_url="https://www.theguardian.com/football/scottish-league-one/table")
# scottish_league_two = League(league_name='Scottish League Two',
#                              league_url="https://www.theguardian.com/football/scottish-league-two/table")

db.session.add_all([epl, bundesliga, serie_a, la_liga, ligue_1, scottish_premiership, english_championship, english_league_one])


def update_league_stats(league):
    """Update the stats for a league by re-scraping data from the page. Display all team info."""
    current_league = db.session.query(League).filter(
        League.league_name == league.league_name).one()

    print("current_league", current_league, current_league.league_name, current_league.id)

    league_url = League.get_league_url(current_league.id)

    team_infos = retrieveLeagueInfo(league_url)
    for team_info in team_infos:  # Update teams from newly scraped table data.

        team_exists = db.session.query(Team).filter(
            Team.team_name == team_info.teamName).one_or_none()  # Checks if team exists already.

        if not team_exists:
            team = Team(team_name=team_info.teamName,
                        team_name_abbrev=team_info.teamNameAbbrev,
                        team_crest=team_info.teamCrest,
                        team_hyperlink=team_info.teamHyperlink)

            db.session.merge(team)
            db.session.commit()

        current_team = db.session.query(Team).filter(
            Team.team_name == team_info.teamName).one()

        # Using team_id and league_id as reference, update the team's statistics for specific league in the database.
        current_team_league_statistics = StatisticsForLeague(team_id=current_team.id, league_id=current_league.id,
                                                             current_standing=team_info.currentStanding, games_played=team_info.gamesPlayed,
                                                             wins=team_info.wins, draws=team_info.draws, losses=team_info.losses,
                                                             goals_for=team_info.goalsFor, goals_against=team_info.goalsAgainst,
                                                             goals_differential=team_info.goalDifferential, points=team_info.points)

        db.session.merge(current_team_league_statistics)
        db.session.commit()


# Add Teams from League(s)
for league in [epl, bundesliga, serie_a, la_liga, ligue_1, scottish_premiership, english_championship, english_league_one]:
    update_league_stats(league)


# Add Users' follows for teams and leagues.
league_follow_1 = LeaguesFollowedByUser(user_id=1, league_id=1)
league_follow_2 = LeaguesFollowedByUser(user_id=1, league_id=2)
league_follow_3 = LeaguesFollowedByUser(user_id=2, league_id=2)

db.session.add_all([league_follow_1, league_follow_2, league_follow_3])

team_follow_1 = TeamsFollowedByUser(user_id=1, team_id=1)
team_follow_2 = TeamsFollowedByUser(user_id=1, team_id=2)
team_follow_3 = TeamsFollowedByUser(user_id=1, team_id=12)
team_follow_4 = TeamsFollowedByUser(user_id=1, team_id=20)
team_follow_5 = TeamsFollowedByUser(user_id=1, team_id=33)
team_follow_6 = TeamsFollowedByUser(user_id=1, team_id=39)
team_follow_7 = TeamsFollowedByUser(user_id=1, team_id=69)
team_follow_8 = TeamsFollowedByUser(user_id=2, team_id=90)
team_follow_8 = TeamsFollowedByUser(user_id=2, team_id=99)

db.session.add_all([team_follow_1, team_follow_2, team_follow_3, team_follow_4,
                   team_follow_5, team_follow_6, team_follow_7, team_follow_8])

# db.session.add_all()
db.session.commit()
