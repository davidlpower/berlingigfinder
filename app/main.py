from related_artists import RelatedArtists
from gig_list_parser import GigListParser

artists = RelatedArtists()
giglist = GigListParser().get_gig_list()

fav_artists = ["Jon Hopkins", "Olafur Arnalds", "Keaton Henson", "Joy Division", "DIIV", "Nosaj Thing", "Set Fire To Flames", "Sigur Ros", "The Cure", "Four Tet", "Nils Frahm", "Joni Mitchell"]

for artist in fav_artists:
    all_artists = artists.get_related_artists(artist)[0:11]
    print('- - - - - - - - - - - - - - - \n')
    print(f"Primary Artist: {all_artists[0]} \n")
    for possible in all_artists:
        for gig in giglist:
            if possible in gig['artist']:
                print(f" - '{gig['artist']}', is playing in '{gig['venue']}' on the '{gig['date']}'. \n")
    print('- - - - - - - - - - - - - - - \n')
