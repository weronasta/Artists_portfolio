from flask import Flask, jsonify, request, abort
import sqlite3
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import CORS
import jwt
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

SECRET_KEY = "your_secret_key"  # Klucz tajny do podpisywania tokenów JWT


# Funkcja do weryfikacji JWT
def verify_token(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        return None  # Token wygasł
    except jwt.InvalidTokenError:
        return None  # Nieprawidłowy toke


# Funkcja do połączenia się z bazą danych SQLite
def get_db_connection():
    conn = sqlite3.connect("my_database.db")  # Nazwa pliku bazy danych
    conn.row_factory = sqlite3.Row  # Aby móc odwoływać się do kolumn przez nazwy
    return conn


# Endpoint GET, który pobiera dane o wszystkich dziełach sztuki
@app.route("/artworks", methods=["GET"])
def get_artworks():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Zapytanie SQL, które pobiera wszystkie dzieła sztuki
    cursor.execute("SELECT * FROM artworks")

    # Pobieramy wszystkie wiersze z tabeli
    artworks = cursor.fetchall()

    # Konwertujemy wyniki do listy słowników (JSON)
    result = []
    for artwork in artworks:
        result.append(
            {
                "id": artwork["id"],
                "artist_id": artwork["artist_id"],
                "name": artwork["name"],
                "description": artwork["description"],
                "currentPrice": artwork["currentPrice"],
                "imageLink": artwork["imageLink"],
                "availabilityType": artwork["availabilityType"],
                "numberOf": artwork["numberOf"],
            }
        )

    conn.close()  # Zamykamy połączenie z bazą danych

    # Zwracamy dane w formacie JSON
    return jsonify(result)


# Endpoint GET, który pobiera dane o konkretnym dziele sztuki
@app.route("/artworks/<int:id>", methods=["GET"])
def get_artwork(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Zapytanie SQL, które pobiera dzieło sztuki o konkretnym id
    cursor.execute("SELECT * FROM artworks WHERE id = ?", (id,))

    # Pobieramy jeden wiersz z tabeli
    artwork = cursor.fetchone()

    conn.close()  # Zamykamy połączenie z bazą danych

    # Sprawdzamy, czy znaleziono dzieło sztuki
    if artwork is None:
        return {"error": "Artwork not found"}, 404

    # Konwertujemy wynik do słownika (JSON)
    result = {
        "id": artwork["id"],
        "artist_id": artwork["artist_id"],
        "name": artwork["name"],
        "description": artwork["description"],
        "currentPrice": artwork["currentPrice"],
        "imageLink": artwork["imageLink"],
        "availabilityType": artwork["availabilityType"],
        "numberOf": artwork["numberOf"],
    }

    # Zwracamy dane w formacie JSON
    return jsonify(result)


# Endpoint GET, który pobiera wszystkich artystów
@app.route("/artists", methods=["GET"])
def get_artists():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Zapytanie SQL, które pobiera wszystkich artystów
    cursor.execute("SELECT id, username, avatarLink, bio FROM artists")

    # Pobieramy wszystkie wiersze z tabeli
    artists = cursor.fetchall()

    # Konwertujemy wyniki do listy słowników (JSON)
    result = []
    for artist in artists:
        result.append(
            {
                "id": artist["id"],
                "username": artist["username"],
                "avatarLink": artist["avatarLink"],
                "bio": artist["bio"],
            }
        )

    conn.close()  # Zamykamy połączenie z bazą danych

    # Zwracamy dane w formacie JSON
    return jsonify(result)


# Endpoint GET, który pobiera dane o konkretnym artyście
@app.route("/artists/<int:id>", methods=["GET"])
def get_artist(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Zapytanie SQL, które pobiera artystę o konkretnym id
    cursor.execute("SELECT * FROM artists WHERE id = ?", (id,))

    # Pobieramy jeden wiersz z tabeli
    artist = cursor.fetchone()

    conn.close()  # Zamykamy połączenie z bazą danych

    # Sprawdzamy, czy znaleziono dzieło sztuki
    if artist is None:
        return {"error": "Artist not found"}, 404

    # Konwertujemy wynik do słownika (JSON)
    result = {
        "id": artist["id"],
        "username": artist["username"],
        "avatarLink": artist["avatarLink"],
        "bio": artist["bio"],
    }

    # Zwracamy dane w formacie JSON
    return jsonify(result)


# Endpoint GET, który pobiera dane o wszystkich dziełach sztuki danego artysty
@app.route("/artworks/artist/<int:artist_id>", methods=["GET"])
def get_artworks_by_artist(artist_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Zapytanie SQL, które pobiera dzieła sztuki dla konkretnego artysty
    cursor.execute("SELECT * FROM artworks WHERE artist_id = ?", (artist_id,))

    # Pobieramy wszystkie wiersze z tabeli
    artworks = cursor.fetchall()

    # Konwertujemy wyniki do listy słowników (JSON)
    result = []
    for artwork in artworks:
        result.append(
            {
                "id": artwork["id"],
                "artist_id": artwork["artist_id"],
                "name": artwork["name"],
                "description": artwork["description"],
                "currentPrice": artwork["currentPrice"],
                "imageLink": artwork["imageLink"],
                "availabilityType": artwork["availabilityType"],
                "numberOf": artwork["numberOf"],
            }
        )

    conn.close()  # Zamykamy połączenie z bazą danych

    # Zwracamy dane w formacie JSON
    return jsonify(result)


# Endpoint do logowania użytkownika
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()  # Pobieramy dane z żądania

    # Sprawdzamy, czy dane są prawidłowe
    if not data.get("email") or not data.get("password"):
        abort(400, description="Email and password are required.")

    login = data["email"]
    password = data["password"]

    # Sprawdzamy, czy użytkownik istnieje
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM artists WHERE login = ?", (login,))
    user = cursor.fetchone()

    if user is None:
        conn.close()
        abort(401, description="Invalid email or password.")

    if not check_password_hash(user["password"], password):
        print("Invalid password")
        conn.close()
        abort(401, description="Invalid email or password.")

    token = jwt.encode(
        {
            "id": user["id"],
            "exp": datetime.datetime.utcnow()
            + datetime.timedelta(hours=1),  # Ważność tokenu na 1 godzinę
        },
        SECRET_KEY,
        algorithm="HS256",
    )
    conn.close()
    return jsonify({"message": "Login successful!", "token": token}), 200
    # return jsonify({"message": "Login successful!"}), 200


# Middleware do weryfikacji tokenu w chronionych endpointach
# @app.before_request
# def before_request():
#     if request.endpoint in ['profile']:  # Endpointy, które wymagają autoryzacji
#         token = request.headers.get('Authorization')  # Pobieramy token z nagłówka
#         if token is None:
#             print("Sraka")
#             abort(401, description="Token is missing.")

#         # Usuwamy "Bearer" z tokena
#         token = token.split(" ")[1]
#         decoded = verify_token(token)

#         if decoded is None:
#             print("Invalid or expired token")
#             abort(401, description="Invalid or expired token.")

#         request.user = decoded  # Dodajemy dane użytkownika do obiektu request (np. id artysty)


# Endpoint GET, który pobiera dane użytkownika (profil)
@app.route("/profile", methods=["GET"])
def profile():
    # Pobieramy token z nagłówka 'Authorization'
    token = request.headers.get("Authorization")
    print(token)

    if token is None:
        print("Dupa")
        abort(401, description="Token is missing.")

    # Usuwamy "Bearer" z tokena
    token = token.split(" ")[1]

    # Weryfikujemy token
    decoded = verify_token(token)
    print(f"{decoded=}")

    if decoded is None:
        print("Kotek")
        abort(401, description="Invalid or expired token.")

    # Pobieramy ID użytkownika z dekodowanego tokenu
    user_id = decoded["id"]
    print(f"{user_id=}")

    # Tworzymy połączenie z bazą danych
    conn = get_db_connection()
    cursor = conn.cursor()

    # Pobieramy dane użytkownika na podstawie jego ID
    cursor.execute("SELECT * FROM artists WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    print(f"{user=}")

    conn.close()

    if user is None:
        abort(404, description="User not found.")

    # Konwertujemy dane użytkownika na słownik (JSON)
    result = {
        "id": user["id"],
        "username": user["username"],
        "avatarLink": user["avatarLink"],
        "bio": user["bio"],
    }
    print(f"{result=}")

    return jsonify(result), 200


# Endpoint POST do rejestracji użytkownika
@app.route("/register", methods=["POST"])
def register():
    # Pobieramy dane z żądania
    data = request.get_json()

    # Walidujemy dane wejściowe
    if (
        not data
        or not data.get("username")
        or not data.get("login")
        or not data.get("password")
    ):
        abort(400, description="Missing required fields: username, login, or password")

    username = data["username"]
    login = data["login"]
    password = data["password"]

    # Hashujemy hasło
    hashed_password = generate_password_hash(password)

    # Sprawdzamy, czy login już istnieje
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM artists WHERE login = ?", (login,))
    existing_user = cursor.fetchone()
    cursor.execute("SELECT * FROM artists WHERE username = ?", (username,))
    existing_user2 = cursor.fetchone()

    if existing_user:
        conn.close()
        abort(400, description="Login already exists")
    elif existing_user2:
        conn.close()
        abort(400, description="Username already exists")
    # Wstawiamy nowego użytkownika do tabeli artists
    cursor.execute(
        """
        INSERT INTO artists (username, login, password, isAdmin, avatarLink, bio)
        VALUES (?, ?, ?, 0, 'avatar_placeholder.png', 'placeholder bio')
    """,
        (username, login, hashed_password),
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "User registered successfully"}), 201


# endpoint for adding a sale with sale items
@app.route("/add_sale", methods=["POST"])
def add_sale():
    # Odczytujemy dane z JSON w żądaniu
    try:
        new_sale = request.get_json()["saleData"]
    except:
        new_sale = None

    # Walidacja danych wejściowych
    if not new_sale or not new_sale.get("user_email") or not new_sale.get("items"):
        abort(400, description="Missing required fields: user_email or items")

    user_email = new_sale["user_email"]
    items = new_sale["items"]
    created_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO sales (user_email, created_at)
        VALUES (?, ?)
    """,
        (user_email, created_at),
    )

    cursor.execute("SELECT max(id) FROM sales")
    sale_id = cursor.fetchone()[0]

    for item in items:
        cursor.execute(
            """
            INSERT INTO sale_items (sale_id, piece_id, quantity, total_price)
            VALUES (?, ?, ?, ?)
        """,
            (sale_id, item["piece"], item["quantity"], item["total_price"]),
        )

    for item in items:
        cursor.execute(
            """
            UPDATE artworks
            SET numberOf = numberOf - ?
            WHERE id = ?
        """,
            (item["quantity"], item["piece"]),
        )

    # if any of the artworks numberOf somehow is below 0, rollback the transaction and return an error

    cursor.execute(
        """
        SELECT numberOf
        FROM artworks
        WHERE numberOf < 0
    """
    )

    if cursor.fetchone():
        conn.rollback()
        conn.close()
        abort(400, description="Not enough items in stock")

    cursor.execute(
        """
        UPDATE artworks
        SET availabilityType = "Wyprzedane"
        WHERE numberOf = 0
    """
    )

    conn.commit()  # Zatwierdzamy zmiany w bazie danych
    conn.close()

    return (
        jsonify({"message": "Sale added successfully"}),
        201,
    )  # Zwracamy odpowiedź z komunikatem


# Endpoint POST do dodawania dzieła sztuki
@app.route("/add_artwork", methods=["POST"])
def add_artwork():
    # Odczytujemy dane z JSON w żądaniu
    new_artwork = request.get_json()

    # Walidacja danych wejściowych
    if (
        not new_artwork
        or not new_artwork.get("name")
        or not new_artwork.get("artist_id")
    ):
        abort(400, description="Missing required fields: name or artist_id")

    name = new_artwork["name"]
    artist_id = new_artwork["artist_id"]
    description = new_artwork.get("description", "")
    currentPrice = new_artwork.get("currentPrice", 0.0)
    imageLink = new_artwork.get("imageLink", "")
    availabilityType = new_artwork.get("availabilityType", "Available")
    numberOf = new_artwork.get("numberOf", 1)

    # Tworzymy połączenie z bazą danych i wykonujemy zapytanie INSERT
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO artworks (artist_id, name, description, currentPrice, imageLink, availabilityType, numberOf)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """,
        (
            artist_id,
            name,
            description,
            currentPrice,
            imageLink,
            availabilityType,
            numberOf,
        ),
    )

    conn.commit()  # Zatwierdzamy zmiany w bazie danych
    conn.close()  # Zamykamy połączenie

    return (
        jsonify({"message": "Artwork added successfully"}),
        201,
    )  # Zwracamy odpowiedź z komunikatem


# Endpoint DELETE do usuwania dzieła sztuki
@app.route("/delete_artwork/<int:artwork_id>", methods=["DELETE"])
def delete_artwork(artwork_id):
    # Tworzymy połączenie z bazą danych
    conn = get_db_connection()
    cursor = conn.cursor()

    # Zapytanie SQL, które sprawdza, czy dzieło sztuki istnieje
    cursor.execute("SELECT * FROM artworks WHERE id = ?", (artwork_id,))
    artwork = cursor.fetchone()

    if not artwork:
        conn.close()  # Zamykamy połączenie, jeśli dzieło nie istnieje
        abort(
            404, description="Artwork not found"
        )  # Zwracamy błąd, jeśli dzieło nie istnieje

    # Usuwamy dzieło sztuki z bazy danych
    cursor.execute("DELETE FROM artworks WHERE id = ?", (artwork_id,))
    conn.commit()  # Zatwierdzamy zmiany w bazie danych
    conn.close()  # Zamykamy połączenie

    return (
        jsonify({"message": "Artwork deleted successfully"}),
        200,
    )  # Zwracamy komunikat o powodzeniu


if __name__ == "__main__":
    app.run(debug=True)
