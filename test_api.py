from flask import Flask, jsonify, request, abort
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


# Funkcja do połączenia się z bazą danych SQLite
def get_db_connection():
    conn = sqlite3.connect('my_database.db')  # Nazwa pliku bazy danych
    conn.row_factory = sqlite3.Row  # Aby móc odwoływać się do kolumn przez nazwy
    return conn

# Endpoint GET, który pobiera dane o wszystkich dziełach sztuki
@app.route('/artworks', methods=['GET'])
def get_artworks():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Zapytanie SQL, które pobiera wszystkie dzieła sztuki
    cursor.execute('SELECT * FROM artworks')
    
    # Pobieramy wszystkie wiersze z tabeli
    artworks = cursor.fetchall()
    
    # Konwertujemy wyniki do listy słowników (JSON)
    result = []
    for artwork in artworks:
        result.append({
            'id': artwork['id'],
            'artist_id': artwork['artist_id'],
            'name': artwork['name'],
            'description': artwork['description'],
            'currentPrice': artwork['currentPrice'],
            'imageLink': artwork['imageLink'],
            'availabilityType': artwork['availabilityType'],
            'numberOf': artwork['numberOf']
        })
    
    conn.close()  # Zamykamy połączenie z bazą danych
    
    # Zwracamy dane w formacie JSON
    return jsonify(result)

# Endpoint GET, który pobiera dane o konkretnym dziele sztuki
@app.route('/artworks/<int:id>', methods=['GET'])
def get_artwork(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Zapytanie SQL, które pobiera dzieło sztuki o konkretnym id
    cursor.execute('SELECT * FROM artworks WHERE id = ?', (id,))

    # Pobieramy jeden wiersz z tabeli
    artwork = cursor.fetchone()

    conn.close()  # Zamykamy połączenie z bazą danych

    # Sprawdzamy, czy znaleziono dzieło sztuki
    if artwork is None:
        return {'error': 'Artwork not found'}, 404

    # Konwertujemy wynik do słownika (JSON)
    result = {
        'id': artwork['id'],
        'artist_id': artwork['artist_id'],
        'name': artwork['name'],
        'description': artwork['description'],
        'currentPrice': artwork['currentPrice'],
        'imageLink': artwork['imageLink'],
        'availabilityType': artwork['availabilityType'],
        'numberOf': artwork['numberOf']
    }

    # Zwracamy dane w formacie JSON
    return jsonify(result)

# Endpoint GET, który pobiera wszystkich artystów
@app.route('/artists', methods=['GET'])
def get_artists():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Zapytanie SQL, które pobiera wszystkich artystów
    cursor.execute('SELECT id, username, avatarLink, bio FROM artists')
    
    # Pobieramy wszystkie wiersze z tabeli
    artists = cursor.fetchall()
    
    # Konwertujemy wyniki do listy słowników (JSON)
    result = []
    for artist in artists:
        result.append({
            'id': artist['id'],
            'username': artist['username'],
            'avatarLink': artist['avatarLink'],
            'bio': artist['bio'],
        })
    
    conn.close()  # Zamykamy połączenie z bazą danych
    
    # Zwracamy dane w formacie JSON
    return jsonify(result)

# Endpoint GET, który pobiera dane o konkretnym artyście
@app.route('/artists/<int:id>', methods=['GET'])
def get_artist(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Zapytanie SQL, które pobiera artystę o konkretnym id
    cursor.execute('SELECT * FROM artists WHERE id = ?', (id,))

    # Pobieramy jeden wiersz z tabeli
    artist = cursor.fetchone()

    conn.close()  # Zamykamy połączenie z bazą danych

    # Sprawdzamy, czy znaleziono dzieło sztuki
    if artist is None:
        return {'error': 'Artist not found'}, 404

    # Konwertujemy wynik do słownika (JSON)
    result = {
        'id': artist['id'],
        'username': artist['username'],
        'avatarLink': artist['avatarLink'],
        'bio': artist['bio'],
    }

    # Zwracamy dane w formacie JSON
    return jsonify(result)

# Endpoint GET, który pobiera dane o wszystkich dziełach sztuki danego artysty
@app.route('/artworks/artist/<int:artist_id>', methods=['GET'])
def get_artworks_by_artist(artist_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Zapytanie SQL, które pobiera dzieła sztuki dla konkretnego artysty
    cursor.execute('SELECT * FROM artworks WHERE artist_id = ?', (artist_id,))
    
    # Pobieramy wszystkie wiersze z tabeli
    artworks = cursor.fetchall()
    
    # Konwertujemy wyniki do listy słowników (JSON)
    result = []
    for artwork in artworks:
        result.append({
            'id': artwork['id'],
            'artist_id': artwork['artist_id'],
            'name': artwork['name'],
            'description': artwork['description'],
            'currentPrice': artwork['currentPrice'],
            'imageLink': artwork['imageLink'],
            'availabilityType': artwork['availabilityType'],
            'numberOf': artwork['numberOf']
        })
    
    conn.close()  # Zamykamy połączenie z bazą danych
    
    # Zwracamy dane w formacie JSON
    return jsonify(result)



# Endpoint POST do dodawania dzieła sztuki
@app.route('/add_artwork', methods=['POST'])
def add_artwork():
    # Odczytujemy dane z JSON w żądaniu
    new_artwork = request.get_json()
    
    # Walidacja danych wejściowych
    if not new_artwork or not new_artwork.get('name') or not new_artwork.get('artist_id'):
        abort(400, description="Missing required fields: name or artist_id")
    
    name = new_artwork['name']
    artist_id = new_artwork['artist_id']
    description = new_artwork.get('description', '')
    currentPrice = new_artwork.get('currentPrice', 0.0)
    imageLink = new_artwork.get('imageLink', '')
    availabilityType = new_artwork.get('availabilityType', 'Available')
    numberOf = new_artwork.get('numberOf', 1)
    
    # Tworzymy połączenie z bazą danych i wykonujemy zapytanie INSERT
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO artworks (artist_id, name, description, currentPrice, imageLink, availabilityType, numberOf)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (artist_id, name, description, currentPrice, imageLink, availabilityType, numberOf))
    
    conn.commit()  # Zatwierdzamy zmiany w bazie danych
    conn.close()   # Zamykamy połączenie
    
    return jsonify({"message": "Artwork added successfully"}), 201  # Zwracamy odpowiedź z komunikatem

# Endpoint DELETE do usuwania dzieła sztuki
@app.route('/delete_artwork/<int:artwork_id>', methods=['DELETE'])
def delete_artwork(artwork_id):
    # Tworzymy połączenie z bazą danych
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Zapytanie SQL, które sprawdza, czy dzieło sztuki istnieje
    cursor.execute('SELECT * FROM artworks WHERE id = ?', (artwork_id,))
    artwork = cursor.fetchone()
    
    if not artwork:
        conn.close()  # Zamykamy połączenie, jeśli dzieło nie istnieje
        abort(404, description="Artwork not found")  # Zwracamy błąd, jeśli dzieło nie istnieje
    
    # Usuwamy dzieło sztuki z bazy danych
    cursor.execute('DELETE FROM artworks WHERE id = ?', (artwork_id,))
    conn.commit()  # Zatwierdzamy zmiany w bazie danych
    conn.close()   # Zamykamy połączenie
    
    return jsonify({"message": "Artwork deleted successfully"}), 200  # Zwracamy komunikat o powodzeniu

if __name__ == '__main__':
    app.run(debug=True)
