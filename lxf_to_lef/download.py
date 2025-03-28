import requests
import json

r = requests.get("https://www.swimtimebrasil.com/_functions/getEventos?temporada=2024&idEntidade=*&piscinaMetragem=*&sortField=dataInicio&sortOrder=ascending")

data = json.loads(r.content)

for comp in data:
    url = "https://swimsystem.swimtimebrasil.com/"+comp['_id']+"/results.lxf"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    response = requests.get(url, headers=headers)
    print(response.url)
    with open('files/'+comp['_id']+'.lxf', 'wb') as file:
        file.write(response.content)