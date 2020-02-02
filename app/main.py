from related_artists import RelatedArtists

primary = "Olafur Arnalds"
artists = RelatedArtists()
related = artists.get_related_artists(primary)[1:6]

print(f"You said you liked '{primary}', maybe you would also like {', '.join([str(elm) for elm in related])}.")