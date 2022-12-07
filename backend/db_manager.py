import json
import mysql.connector


class DBManager:
    def __init__(self, database='berlingigs', host="db", user="root", password_file=None):
        pf = open(password_file, 'r')
        self.connection = mysql.connector.connect(
            user=user, 
            password=pf.read(),
            host=host, # name of the mysql service as set in the docker compose file
            database=database,
            auth_plugin='mysql_native_password'
        )
        pf.close()
        self.cursor = self.connection.cursor()
    
    def populate_db(self):
        fav_artists = None
        with open('./favourite_artists.json') as json_file:
            fav_artists = json.load(json_file)["artists"]

        self.cursor.execute('DROP TABLE IF EXISTS artists')
        self.cursor.execute('CREATE TABLE artists (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))')
        for artist in fav_artists:
            self.cursor.execute("INSERT INTO artists (name) VALUES ('{0}');".format(artist))
        self.connection.commit()
    
    def get_all_favourite_artists(self):
        self.cursor.execute('SELECT name FROM artists')
        rec = []
        for c in self.cursor:
            rec.append(c[0])
        return rec