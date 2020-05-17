# battleship
WebService Development - Battleship Game

## Gameplay
Grundsätzlich wird anfangs ausgelost wer schießen darf. Die erste Person gibt eine Koordinate an, auf die er so zu sagen feuert, zum Beispiel C3. Beim "beschossenen" User wird dieses Feld nun dargestellt. Es kann Wasser oder ein Schiff getroffen werden. ein Schiff gilt als versenkt, wenn alle Felder des Schiffes getroffen wurden. Der Schießende sieht auf seinem eingenen Spielfeld ob er etwas getroffen hat oder nicht. Grundsätzlich wechseln die User jede Runde zwischen den Schießenden und dem Beschossenen. 
Wenn ein "Treffer" gemacht wird kann der Schießende noch einen Zug ausführen, dass geht so lange weiter bis er ins Wasser schießt.


## Heroku Configuration
Unser Projekt funktioniert über Heroku.
1) Einen Heroku account erstellen 
2) Daraufhin die Heroku CLI installieren
  a)"Sudo snap install --classic heroku"
3) Ein Projekt folder erstellen (z.B über WebStorm)
  a) in diesem Projekt folder "heroku login"
4) SSH Keys hinzufügen wenn nicht bereits erstellt
  a) überprüfen mit "heroku keys" 
  b) ansonsten "heroku keys:add"
5) im Projekt einen folder erstellen "mkdir app"
6) im root-Verzeichnis "npm init" - um ein package.json zu ersellen
7) "npm install express body-parser --save"
  a) damit werden express und body-parser zu node hinzugefügt und auch in package.json hinzugefügt
8) im root-Verzeichznis, server.js erstellen 
9) Heroku configuration
  a) im package.json muss die node version eingetragen werden
    i)"node":"10.x"
    ii)unter scripts muss "start": "node server.js" hinzugefügt werden falls kein Procfile vorhanden ist
10) darauf hin muss eine Procfile erstellt werden um die webApplikation zu starten
    a)diese muss "web : node server.js" beinhalten 
11) eine .env datei erstellen und den Port angeben
  a) PORT:8080
12)um die WebApplikation nun lokal aufzurufen
  a)"npm install"
  b)"heroku local web"


## Technology Documentation - Early Bird 
Derzeit hat unsere WebApplikation ein Frontend in dem man die Felder anklicken kann. Gerade kann man noch alle Felder auswählen, später soll es dann möglich sein aus einem vorgegebenen Set von Schiffen auszuwählen. 

Hier wurde im ersten Schritt ein Websocket programmiert, dieser ist für die Kommunikation zwischen den Spielern zuständig. So werden neu hinzugefügt bzw. upgedatete Usernamen gleich wie eine Message vom Client 1 an den Server und von dort an alle anderen Clients verschickt. Diese werden dann bei jedem Client in der Console ausgegeben.

Im letzten Schritt welcher aber noch nicht im aktuellen Projekt implementiert ist haben wir uns die Verbindung zur Datenbank angesehen. Heroku stellt gratis Datanbanken zur verfügng - wir haben uns hier auf postgresql geeinigt. 
Wir haben eine API erstellt mit der man die User aus der DB auslesen und speichern kann. 
Der Code dafür ist in unserem zweiten Repository: 
[GitHub](https://github.com/juliaTrummer/fh-battleship)
