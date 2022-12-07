from url_generator import UrlGenerator
from bs4 import BeautifulSoup
import requests as req


class RelatedArtists():
    def get_related_artists(self, artist):
        url_generator = UrlGenerator()
        resp = req.request(method='GET', url=url_generator.generate(artist))
        soup = BeautifulSoup(resp.text, 'html.parser')
        artists = []
        
        for link in soup.find_all("a", class_="S"):
            print(link.get_text())
            artists.append(link.get_text())
        
        return artists
