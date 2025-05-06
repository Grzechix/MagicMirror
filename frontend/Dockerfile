# Dockerfile for frontend (static HTML, JS, CSS)

# Używamy oficjalnego obrazu nginx jako serwera WWW
FROM nginx:alpine

# Kopiujemy zawartość katalogu frontend do domyślnego katalogu nginx
COPY . /usr/share/nginx/html

# Otwieramy port 80, na którym nginx będzie dostępny
EXPOSE 80
