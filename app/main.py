from related_artists import RelatedArtists
from gig_list_parser import GigListParser

primary = "Olafur Arnalds"
artists = RelatedArtists()
related = artists.get_related_artists(primary)[1:6]

giglist = GigListParser().get_gig_list()

print(giglist)

print(f"You said you liked '{primary}', maybe you would also like {', '.join([str(elm) for elm in related])}.")