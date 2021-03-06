import json
from related_artists import RelatedArtists
from gig_list_parser import GigListParser


artists = RelatedArtists()
gigListParser = GigListParser()

# get all gigs in Berlin
giglist = gigListParser.get_gig_list()

# Load artists from json file
fav_artists = []
with open('./favourite_artists.json') as json_file:
    fav_artists = json.load(json_file)["artists"]

# get related artists and display gigs
for artist in fav_artists:
    all_artists = artists.get_related_artists(artist)[0:11]
    print("\n" + f"Favourite Artist: {artist} \n")
    if all_artists:
        for possible in all_artists:
            for gig in giglist:
                if possible in gig['artist']:
                    print(f" - '{gig['artist']}', is playing in '{gig['venue']}' on the '{gig['date']}'. \n")
    else:
        print('- No gigs found for this artists.')
    print('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n')
