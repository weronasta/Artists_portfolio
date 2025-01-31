# Project Overview
This web application combines an artist’s portfolio with online ordering functionality. It provides users with the ability to explore the artist's work and place online orders. The technologies used include **React** and **MaterialUI** for the frontend, **Python Flask** for the backend, and **SQLite** for the database.

# Key features

### Home
* presentation of the artist’s latest works in a gallery format
* section presenting artists

### Artworks gallery
* grid display of artworks with thumbnails
* option to add items to the cart or open artwork details

### Artwork details
* detailed view of individual artworks, including:
    * title
    * image
    * description
    * price
    * availability status (available, sold out)
* option to add the artwork to the cart
* Note: all images are stored locally at: `my-app/src/assets/images/artworks`

### Artists gallery
* grid display of artists with avatars
* option to open artist's profile
* Note: all images are stored locally at: `my-app/src/assets/images/artists`

### Artist profile
* detailed view of individual artist, including:
    * username
    * bio
    * gallery with all artist's artworks

### Cart
* display and management of products in the cart
* ability to place orders (without payment processing)

### Artist management panel
* functionality for the artist to manage their portfolio:
    * add new artworks
    * delete existing artworks
    * edit artwork details (title, image, description, price, number of available items)
* edit profile (avatar, username, bio)

### Artists registration module
* registration
* login (with JWT for endpoint authentication)

# How to run:
## Installation:
### Backend API:
- Python=3.12.2
- Flask=3.1.0
- Flask-Cors=5.0.0

to install (assuming you have python installed):
```bash
pip install flask=3.1.0
pip install flask-cors=5.0.0
pip install pyjwt=2.10.1
```

### Frontend:
- Node.js
- React
- react-router-dom
- @mui/material
- @emotion/react
- @emotion/styled
- @mui/icons-material
- slick-carousel
- axios

to install (assuming you have npm installed):
```bash
cd my-app
npm install --save react-router-dom
npm install @mui/material
npm install @emotion/react
npm install @emotion/styled
npm install @mui/icons-material
npm install slick-carousel
npm install axios
```


## Running the application:
in one terminal window:
```bash
cd my-app
npm start
```

in another terminal window (in the root directory):
```bash
python3 backend_api.py
```
