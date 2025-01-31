from flask import Flask, jsonify, request, abort
import sqlite3
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import CORS
import jwt
import datetime, time
import os

SECRET_KEY = "your_secret_key"  # key for encoding and decoding JWT
UPLOAD_FOLDER = "./my-app/src/assets/images/artworks"  # folder for artworks
UPLOAD_FOLDER2 = "./my-app/src/assets/images/artists"  # folder for artists
ALLOWED_EXTENSIONS = {
    "png",
    "jpg",
    "jpeg",
    "gif",
    "webp",
}  # allowed file extensions for images

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Set the upload folder for images
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["UPLOAD_FOLDER2"] = UPLOAD_FOLDER2


def get_unique_filename(filename):
    base, extension = os.path.splitext(filename)
    timestamp = int(time.time() * 1000)  # Use timestamp to generate a unique filename
    return f"{base}_{timestamp}{extension}"


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def verify_token(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        return None  # Token is expired
    except jwt.InvalidTokenError:
        return None  # Token is invalid


def get_db_connection():
    """
    Function to establish a connection to the SQLite database
    """
    conn = sqlite3.connect("my_database.db")  # database file name
    conn.row_factory = sqlite3.Row  # to return rows as dictionaries
    return conn


@app.route("/artworks", methods=["GET"])
def get_artworks():
    """
    Endpoint GET, that retrieves data about all artworks
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # get all artworks from the database
    cursor.execute("SELECT * FROM artworks WHERE availabilityType <> 'Deleted'")

    # fetch all rows from the table
    artworks = cursor.fetchall()

    # Convert the results to a list of dictionaries (JSON)
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

    conn.close()  # Close the connection to the database

    # Return the data in JSON format
    return jsonify(result)


@app.route("/artworks/<int:id>", methods=["GET"])
def get_artwork(id):
    """
    Endpoint GET, that retrieves data about a specific artwork
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # SQL query to retrieve artwork with a specific id
    cursor.execute("SELECT * FROM artworks WHERE id = ?", (id,))

    # fetch one row from the table
    artwork = cursor.fetchone()

    conn.close()

    # Check if the artwork was found
    if artwork is None:
        return {"error": "Artwork not found"}, 404

    # Convert the result to a dictionary (JSON)
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

    return jsonify(result)


@app.route("/artists", methods=["GET"])
def get_artists():
    """
    Endpoint GET, that retrieves data about all artists
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # get all artists from the database
    cursor.execute("SELECT id, username, avatarLink, bio FROM artists")

    # fetch all rows from the table
    artists = cursor.fetchall()

    # Convert the results to a list of dictionaries (JSON)
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

    conn.close()
    return jsonify(result)


@app.route("/artists/<int:id>", methods=["GET"])
def get_artist(id):
    """
    Endpoint GET, that retrieves data about a specific artist
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # SQL query to retrieve an artist with a specific id
    cursor.execute("SELECT * FROM artists WHERE id = ?", (id,))

    # fetch one row from the table
    artist = cursor.fetchone()

    conn.close()

    # Check if the artist was found
    if artist is None:
        return {"error": "Artist not found"}, 404

    # Convert the result to a dictionary (JSON)
    result = {
        "id": artist["id"],
        "username": artist["username"],
        "avatarLink": artist["avatarLink"],
        "bio": artist["bio"],
    }
    return jsonify(result)


@app.route("/artworks/artist/<int:artist_id>", methods=["GET"])
def get_artworks_by_artist(artist_id):
    """
    Endpoint GET, that retrieves data about all artworks by a specific artist"""
    conn = get_db_connection()
    cursor = conn.cursor()

    # get all artworks from the database
    cursor.execute(
        "SELECT * FROM artworks WHERE artist_id = ? AND availabilityType <> 'Deleted'",
        (artist_id,),
    )

    artworks = cursor.fetchall()  # fetch all rows from the table

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

    conn.close()
    return jsonify(result)


@app.route("/login", methods=["POST"])
def login():
    """
    Endpoint POST, that logs in a user"""
    data = request.get_json()  # get the data from the request

    # Check if the required fields are present
    if not data.get("email") or not data.get("password"):
        abort(400, description="Email and password are required.")

    login = data["email"]
    password = data["password"]

    # check if the user exists in the database
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM artists WHERE login = ?", (login,))
    user = cursor.fetchone()

    if user is None:
        conn.close()
        abort(401, description="Invalid email or password.")

    # check if the password is correct
    if not check_password_hash(user["password"], password):
        print("Invalid password")
        conn.close()
        abort(401, description="Invalid email or password.")

    # generate a JWT token
    token = jwt.encode(
        {
            "id": user["id"],
            "exp": datetime.datetime.utcnow()
            + datetime.timedelta(hours=1),  # token expires in 1 hour
        },
        SECRET_KEY,
        algorithm="HS256",
    )
    conn.close()
    return jsonify({"message": "Login successful!", "token": token}), 200


@app.route("/profile", methods=["GET"])
def profile():
    """
    Endpoint GET, that retrieves data about a user (profile)"""

    # Get the token from the 'Authorization' header
    token = request.headers.get("Authorization")

    if token is None:
        abort(401, description="Token is missing.")

    # remove "Bearer" from the token
    token = token.split(" ")[1]
    decoded = verify_token(token)

    if decoded is None:
        abort(401, description="Invalid or expired token.")

    user_id = decoded["id"]

    conn = get_db_connection()
    cursor = conn.cursor()

    # get the user from the database
    cursor.execute("SELECT * FROM artists WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    conn.close()

    # Check if the user was found
    if user is None:
        abort(404, description="User not found.")

    # Convert the result to a dictionary (JSON)
    result = {
        "id": user["id"],
        "username": user["username"],
        "avatarLink": user["avatarLink"],
        "bio": user["bio"],
    }
    return jsonify(result), 200


@app.route("/register", methods=["POST"])
def register():
    """
    Endpoint POST, that registers a new user"""
    # get the data from the request
    data = request.get_json()

    # Check if the required fields are present
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

    # hash the password
    hashed_password = generate_password_hash(password)

    # check if the user already exists in the database
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

    # adding a new user to the artists table
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


@app.route("/add_sale", methods=["POST"])
def add_sale():
    """
    Endpoint POST, that adds a new sale with sale items"""
    # Try-except block to handle the case when the JSON is not provided
    try:
        new_sale = request.get_json()["saleData"]
    except:
        new_sale = None

    # Check if the required fields are present
    if not new_sale or not new_sale.get("user_email") or not new_sale.get("items"):
        abort(400, description="Missing required fields: user_email or items")

    user_email = new_sale["user_email"]
    items = new_sale["items"]
    created_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = get_db_connection()
    cursor = conn.cursor()
    # adding a new sale to the sales table
    cursor.execute(
        """
        INSERT INTO sales (user_email, created_at)
        VALUES (?, ?)
    """,
        (user_email, created_at),
    )
    # get the id of the last inserted sale
    cursor.execute("SELECT max(id) FROM sales")
    sale_id = cursor.fetchone()[0]
    # adding sale items to the sale_items table
    for item in items:
        cursor.execute(
            """
            INSERT INTO sale_items (sale_id, piece_id, quantity, total_price)
            VALUES (?, ?, ?, ?)
        """,
            (sale_id, item["piece"], item["quantity"], item["total_price"]),
        )
    # update the number of items in the artworks table
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

    # update the availabilityType in the artworks table
    cursor.execute(
        """
        UPDATE artworks
        SET availabilityType = "Sold out"
        WHERE numberOf = 0
    """
    )

    conn.commit()
    conn.close()

    return (
        jsonify({"message": "Sale added successfully"}),
        201,
    )


@app.route("/add_artwork", methods=["POST"])
def add_artwork():
    """
    Endpoint POST, that adds a new artwork"""
    # check if the image is in the request
    if "image" not in request.files:
        return jsonify({"message": "Nie przesłano pliku"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"message": "Nie wybrano pliku"}), 400

    token = request.headers.get("Authorization")
    if token is None:
        abort(401, description="Token is missing.")
    # remove "Bearer" from the token
    token = token.split(" ")[1]
    decoded = verify_token(token)
    if decoded is None:
        abort(401, description="Invalid or expired token.")
    artist_id = decoded["id"]

    # check if the file is allowed
    if file and allowed_file(file.filename):
        # make sure the folder exists
        os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
        filename = file.filename
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        # if the file exists, generate a new name
        if os.path.exists(file_path):
            filename = get_unique_filename(filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)

        save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(save_path)

        artwork_name = request.form.get("name")
        artwork_description = request.form.get("description")
        artwork_price = request.form.get("currentPrice")
        artwork_imagelink = filename
        artwork_availability = "Available"
        artwork_number = request.form.get("numberOf")

        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO artworks (artist_id, name, description, currentPrice, imageLink, availabilityType, numberOf)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
                (
                    artist_id,
                    artwork_name,
                    artwork_description,
                    artwork_price,
                    artwork_imagelink,
                    artwork_availability,
                    artwork_number,
                ),
            )

            conn.commit()
            conn.close()
        except:
            return (
                jsonify({"message": "Błąd podczas dodawania dzieła do bazy danych"}),
                400,
            )

        return jsonify({"message": "Plik został zapisany!", "path": f"{filename}"}), 200

    return jsonify({"message": "Niedozwolony format pliku"}), 400


@app.route("/update_artwork/<int:artwork_id>", methods=["PUT"])
def update_artwork(artwork_id):
    """
    Endpoint PUT, that updates an artwork"""

    # check if the image is in the request
    if "image" not in request.files:
        file = None
    else:
        file = request.files["image"]

    # token is stored in the headers
    token = request.headers.get("Authorization")
    if token is None:
        abort(401, description="Token is missing.")
    token = token.split(" ")[1]  # remove "Bearer" from the token
    decoded = verify_token(token)
    if decoded is None:
        abort(401, description="Invalid or expired token.")
    artist_id = decoded["id"]

    # check if the file is allowed
    if file and allowed_file(file.filename):
        # make sure the folder exists
        os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
        filename = file.filename
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        # if the file exists, generate a new name
        if os.path.exists(file_path):
            filename = get_unique_filename(filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)

        save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(save_path)
    elif file:
        return jsonify({"message": "Niedozwolony format pliku"}), 400

    artwork_name = request.form.get("name")
    artwork_description = request.form.get("description")
    artwork_price = request.form.get("currentPrice")
    artwork_availability = "Available"
    artwork_number = request.form.get("numberOf")

    if file:
        artwork_imagelink = filename
    else:
        artwork_imagelink = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # see if the artwork is owned by the artist
        cursor.execute("SELECT artist_id FROM artworks WHERE id = ?", (artwork_id,))
        artwork = cursor.fetchone()
        # if the artist is not the owner of the artwork, return an error
        if artwork["artist_id"] != artist_id:
            return jsonify({"message": "Nie jesteś właścicielem dzieła"}), 400

        # if the image is not provided, update the artwork without the image
        if artwork_imagelink is None:
            cursor.execute(
                """
                UPDATE artworks
                SET name = ?, description = ?, currentPrice = ?, availabilityType = ?, numberOf = ?
                WHERE id = ?
            """,
                (
                    artwork_name,
                    artwork_description,
                    artwork_price,
                    artwork_availability,
                    artwork_number,
                    artwork_id,
                ),
            )
        else:
            # update the artwork with the image
            cursor.execute(
                """
                UPDATE artworks
                SET name = ?, description = ?, currentPrice = ?, imageLink = ?, availabilityType = ?, numberOf = ?
                WHERE id = ?
            """,
                (
                    artwork_name,
                    artwork_description,
                    artwork_price,
                    artwork_imagelink,
                    artwork_availability,
                    artwork_number,
                    artwork_id,
                ),
            )

        conn.commit()
        conn.close()
    except:
        return jsonify({"message": "Błąd podczas edycji dzieła"}), 400
    return jsonify({"message": "Dzieło zostało zaktualizowane"}), 200


@app.route("/delete_artwork/<int:artwork_id>", methods=["DELETE"])
def delete_artwork(artwork_id):
    """
    Endpoint DELETE, that deletes an artwork"""

    # token is stored in the headers
    token = request.headers.get("Authorization")
    if token is None:
        abort(401, description="Token is missing.")
    token = token.split(" ")[1]  # remove "Bearer" from the token
    decoded = verify_token(token)
    if decoded is None:
        abort(401, description="Invalid or expired token.")
    artist_id = decoded["id"]

    conn = get_db_connection()
    cursor = conn.cursor()

    # see if the artwork is owned by the artist
    cursor.execute("SELECT artist_id FROM artworks WHERE id = ?", (artwork_id,))
    artwork = cursor.fetchone()
    # if the artist is not the owner of the artwork, return an error
    if artwork["artist_id"] != artist_id:
        return jsonify({"message": "Nie jesteś właścicielem dzieła"}), 400

    # instead of deleting the artwork, we can just set the availabilityType to "Deleted"
    cursor.execute(
        """
        UPDATE artworks
        SET availabilityType = "Deleted"
        WHERE id = ?
    """,
        (artwork_id,),
    )

    conn.commit()
    conn.close()
    return jsonify({"message": "Dzieło zostało usunięte"}), 200


@app.route("/update_artist/<int:artist_id>", methods=["PUT"])
def update_artist(artist_id):
    """
    Endpoint PUT, that updates an artist"""

    # check if the image is in the request
    if "image" not in request.files:
        file = None
    else:
        file = request.files["image"]

    # token is stored in the headers
    token = request.headers.get("Authorization")
    if token is None:
        abort(401, description="Token is missing.")
    token = token.split(" ")[1]  # remove "Bearer" from the token
    decoded = verify_token(token)
    if decoded is None:
        abort(401, description="Invalid or expired token.")
    artist_id = decoded["id"]

    if file and allowed_file(file.filename):
        # make sure the folder exists
        os.makedirs(app.config["UPLOAD_FOLDER2"], exist_ok=True)
        filename = file.filename
        file_path = os.path.join(UPLOAD_FOLDER2, filename)

        # if the file exists, generate a new name
        if os.path.exists(file_path):
            filename = get_unique_filename(filename)
            file_path = os.path.join(UPLOAD_FOLDER2, filename)

        save_path = os.path.join(app.config["UPLOAD_FOLDER2"], filename)
        file.save(save_path)
    elif file:
        return jsonify({"message": "Niedozwolony format pliku"}), 400

    artist_username = request.form.get("username")
    artist_bio = request.form.get("bio")

    if file:
        artist_avatarLink = filename
    else:
        artist_avatarLink = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # if the image is not provided, update the artist without the image
        if artist_avatarLink is None:
            cursor.execute(
                """
                UPDATE artists
                SET username = ?, bio = ?
                WHERE id = ?
            """,
                (artist_username, artist_bio, artist_id),
            )
        else:
            cursor.execute(
                """
                UPDATE artists
                SET username = ?, bio = ?, avatarLink = ?
                WHERE id = ?
            """,
                (artist_username, artist_bio, artist_avatarLink, artist_id),
            )

        conn.commit()
        conn.close()
    except:
        return jsonify({"message": "Błąd podczas edycji profilu"}), 400
    return jsonify({"message": "Profil zostazaktualizowany"}), 200


if __name__ == "__main__":
    app.run(debug=True)
