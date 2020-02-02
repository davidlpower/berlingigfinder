class UrlGenerator():
    url = "https://www.music-map.com"
    
    def generate(self, artist_name):
        return f"{self.url}/{artist_name.lower().replace(' ', '+')}.html"
