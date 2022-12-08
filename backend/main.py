from flask import Flask
from flask import jsonify
from db_manager import DBManager
from related_artists import RelatedArtists
from gig_list_parser import GigListParser

server = Flask(__name__)

relatedArtists = RelatedArtists()
gigListParser = GigListParser()

# Set up database
conn = None
if not conn:
    conn = DBManager(password_file='/run/secrets/db-password')
    conn.populate_db()

# get all gigs in Berlin
giglist = None
if not giglist:
    giglist = gigListParser.get_gig_list()

def createNewGigList():
    global conn
    fav_artists = conn.get_all_favourite_artists()

    response = {}
    if giglist:
        for artist in fav_artists:
            # find all related artists
            related_artists = relatedArtists.get_related_artists(artist)[0:40]

            if related_artists:
                response[artist] = []
                for possible_match in related_artists:
                    for gig in giglist:
                        if possible_match in gig['artist']:
                            recommendation = {
                                "artist": gig['artist'],
                                "venue": gig['venue'],
                                "date": gig['date'],
                                "status": 'still on' if gig['status'] == '' else gig['status'],
                                "source": possible_match
                            }
                            response[artist].append(recommendation)
    return response

@server.route('/')
def displayGigs():
    artists_and_gigs = createNewGigList()
    response = "" 

    if artists_and_gigs:
        for artist, gigs in artists_and_gigs.items():
            response += f"<h2>Because you like {artist}</h2>"
            response += "<ul>"
            if gigs:
                for gig in gigs:
                    status = 'still on' if gig['status'] == '' else gig['status']
                    response += f"<li><b>{gig['artist']}</b> is playing in <b>{gig['venue']}</b> on the <b>{gig['date']}</b> - Status: <b>{status}</b> <code title='Recommendation based off artist {gig['source']}'>&#9432;</code></li>"
                response += "</ul></br>"
            else:
                response += f'<li><i>There are no gigs in Berlin by artists similar to {artist}.</i></li></ul></br>'
    else:
        response = '<h1>No Gigs Found In Berlin!</h1>'

    return response


@server.route('/artists')
def artists():
    response = createNewGigList()
    return jsonify(response)


if __name__ == '__main__':
    server.run()
