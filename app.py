from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

with app.app_context():
        db.create_all()

# Dodawanie nowego użytkownika
new_user = User(username='jan_kowalski', email='jan@example.com')
db.session.add(new_user)
db.session.commit()

# Zapytanie o użytkownika
user = User.query.filter_by(username='jan_kowalski').first()
# Zapytanie o wszystkich użytkowników
all_users = User.query.all()
# Wypisanie wszystkich użytkowników
all_users_list = [f'{user.id}: {user.username} ({user.email})' for user in all_users]
print(user.email)

# Aktualizacja danych użytkownika
user.email = 'jkowalski@example.com'
db.session.commit()

# Usuwanie użytkownika
db.session.delete(user)
db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        # Inicjalizacja bazy danych
        db.create_all()
        app.run(debug=True)

@app.route('/')
def index():
    return 'Witaj w aplikacji Flask z SQLAlchemy!'

@app.route('/add_user/<username>/<email>')
def add_user(username, email):
    new_user = User(username=username, email=email)
    db.session.add(new_user)
    db.session.commit()
    return f'Użytkownik {username} został dodany.'

@app.route('/users')
def get_users():
    users = User.query.all()
    user_list = [f"{user.id}: {user.username} ({user.email})" for user in users]
    return "<br>".join(user_list)

@app.route('/delete_user/<int:user_id>')
def delete_user(user_id):
    user_to_delete = User.query.get(user_id)
    if user_to_delete:
        db.session.delete(user_to_delete)
        db.session.commit()
        return f'Użytkownik o ID {user_id} został usunięty.'
    else:
        return f'Użytkownik o ID {user_id} nie istnieje.'

if __name__ == '__main__':

    with app.app_context():
        db.create_all()
        app.run(debug=True)