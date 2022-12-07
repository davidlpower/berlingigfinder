import os
import json

from flask import Flask
from db_manager import DBManager
from related_artists import RelatedArtists
from gig_list_parser import GigListParser

server = Flask(__name__)
conn = None

artists = RelatedArtists()
gigListParser = GigListParser()

# get all gigs in Berlin
giglist = gigListParser.get_gig_list()

# Load artists from json file
fav_artists = []

@server.route('/')

def listBlog():
    with open('./favourite_artists.json') as json_file:
        fav_artists = json.load(json_file)["artists"]

    global conn
    if not conn:
        conn = DBManager(password_file='/run/secrets/db-password')
        conn.populate_db()
    rec = conn.query_titles()

    response = ''
    # get related artists and display gigs
    for artist in fav_artists:
        all_artists = artists.get_related_artists(artist)[0:40]
        response += "\n" + f"Favourite Artist: {artist} \n"
        if all_artists:
            for possible in all_artists:
                for gig in giglist:
                    if possible in gig['artist']:
                        status = gig['status']
                        status = '\nstill on' if gig['status'] == '' else gig['status']
                        response += f" - '{gig['artist']}'playing in '{gig['venue']}' on the '{gig['date']}' \nStatus of gig: {status} \n"
                        response += f"Recommendation based off artist {possible} \n"
        else:
            response += '- Artist not found \n'
        response += '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n'

    return response


if __name__ == '__main__':
    server.run()
