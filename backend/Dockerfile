# Dockerfile for Flask backend

# Używamy oficjalnego obrazu Pythona
FROM python

# Ustalamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki z lokalnego katalogu do kontenera
COPY . /app

# Instalujemy wymagane biblioteki
RUN pip install --no-cache-dir -r requirements.txt

# Ustawiamy zmienne środowiskowe dla Flask (optional)
# Dzięki temu Flask będzie dostępny na zewnątrz kontenera
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0  

# Port, na którym aplikacja Flask będzie dostępna
EXPOSE 5000

# Uruchamiamy aplikację Flask
CMD ["flask", "run"]
