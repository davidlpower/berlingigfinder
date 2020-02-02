import requests as req
from bs4 import BeautifulSoup

urls = "https://www.music-map.com"
artist = "/olafur+arnalds.html"

resp = req.request(method='GET', url=f"{urls}{artist}")
soup = BeautifulSoup(resp.text, 'html.parser')

for link in soup.find_all("a", class_="S"):
    print(f"Artist: {link.get_text()}")