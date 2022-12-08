from flask import Flask
from flask import jsonify
from db_manager import DBManager
from related_artists import RelatedArtists
from gig_list_parser import GigListParser

server = Flask(__name__)

artists = RelatedArtists()
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


@server.route('/')
def displayGigs():
    global conn
    fav_artists = conn.get_all_favourite_artists()

    response = ""
    if giglist:

        for artist in fav_artists:
            # find all related artists
            related_artists = artists.get_related_artists(artist)[0:40]
            response += f"<h2>Because you like {artist}</h2>"
            response += "<ul>"

            match_found = False
            if related_artists:
                for possible_match in related_artists:
                    for gig in giglist:
                        if possible_match in gig['artist']:
                            match_found = True
                            status = 'still on' if gig['status'] == '' else gig['status']
                            response += f"<li><b>{gig['artist']}</b> is playing in <b>{gig['venue']}</b> on the <b>{gig['date']}</b> - Status: <b>{status}</b> <code title='Recommendation based off artist {possible_match}'>&#9432;</code></li>"
                if not match_found:
                    response += f'<li><i>There are no gigs in Berlin by artists similar to {artist}.</i></li></ul></br>'
                else:
                    response += '</ul></br>'
            else:
                response += f'<li><i>There are no gigs in Berlin by artists similar to {artist}.</i></li></ul></br>'

    else:
        response = '<h1>No Gigs Found In Berlin!</h1>'

    return response


@server.route('/artists')
def artists():
    artist = [{
        'first_name': 'David',
        'last_name': 'Power',
        'age': 99,
        'favorite_colors': ['blue', 'green'],
        'active': True
    }, {
        'first_name': 's',
        'last_name': 'Doe',
        'age': 25,
        'favorite_colors': ['blue', 'green'],
        'active': True
    }]
    return jsonify(artist)


if __name__ == '__main__':
    server.run()
