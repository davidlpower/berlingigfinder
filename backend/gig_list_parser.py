from bs4 import BeautifulSoup
import requests as req


class GigListParser():
    def get_gig_list(self):
        gig_list_url = "http://mytrueintent.blogspot.com"
        resp = req.request(method='GET', url=gig_list_url)
        soup = BeautifulSoup(resp.text, 'html.parser')
        gigs = []
        
        for gig_tr in soup.select(".entry-content tr"):
            gig_tds = gig_tr.select('td')
            try:
                gigs.append({
                    'date': gig_tds[0].get_text().strip(),
                    'status': gig_tds[1].get_text().strip(),
                    'artist': gig_tds[2].get_text().strip(),
                    'venue': gig_tds[3].get_text().replace('\n','')
                })
            except IndexError:
                break
        
        return gigs
