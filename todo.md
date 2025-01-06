### TODO
- [ ] zadanie


### Taski napisane przez GPT:

### Frontend Tasks

#### Strona główna
1. **Zaprojektowanie sekcji galerii na stronie głównej**
   - Stworzenie sekcji wyświetlającej najnowsze prace artysty w formie galerii.

2. **Zaprojektowanie sekcji "O mnie" na stronie głównej**
   - Dodanie sekcji z bio artysty i jego specjalizacją.

#### Galeria prac
3. **Implementacja widoku galerii z miniaturkami**
   - Wyświetlanie prac w formie siatki z miniaturkami, dodanie funkcji "Dodaj do koszyka".

#### Strona szczegółów pracy
4. **Zaprojektowanie i implementacja widoku szczegółów pracy**
   - Wyświetlanie szczegółowych informacji o pracy (nazwa, zdjęcie, opis, cena, dostępność).

5. **Dodanie funkcji "Dodaj do koszyka" na stronie szczegółów pracy**
   - Implementacja przycisku i funkcji dodającej pracę do koszyka.

#### Koszyk i zakup online
6. **Zaprojektowanie i implementacja widoku koszyka**
   - Wyświetlanie produktów w koszyku i zarządzanie nimi (usuwanie, podsumowanie).

7. **Implementacja funkcji składania zamówienia**
   - Dodanie przycisku do składania zamówienia i wysyłanie danych do backendu.

#### Formularz kontaktowy
8. **Zaprojektowanie i implementacja formularza kontaktowego**
   - Stworzenie formularza kontaktowego z walidacją i wysyłaniem danych.

#### Panel zarządzania dla artysty
9. **Zaprojektowanie widoku listy prac w panelu zarządzania**
   - Wyświetlanie listy prac z opcjami dodawania, edycji i usuwania.

10. **Implementacja formularza dodawania/edycji pracy**
    - Stworzenie formularza do dodawania/edycji pracy (nazwa, zdjęcie, opis, cena).

#### Rejestracja i logowanie użytkowników
11. **Zaprojektowanie formularza rejestracji**
    - Stworzenie formularza rejestracji użytkownika z walidacją.

12. **Zaprojektowanie formularza logowania**
    - Stworzenie formularza logowania z walidacją.

### Backend Tasks

#### Endpointy dla prac
1. **Stworzenie endpointu GET `/api/works`**
   - Zwracanie listy dostępnych prac.

2. **Stworzenie endpointu GET `/api/works/<id>`**
   - Zwracanie szczegółów wybranej pracy.

3. **Stworzenie endpointu POST `/api/works`**
   - Dodawanie nowej pracy (wymaga autoryzacji).

4. **Stworzenie endpointu PUT `/api/works/<id>`**
   - Aktualizowanie danych istniejącej pracy.

5. **Stworzenie endpointu DELETE `/api/works/<id>`**
   - Usuwanie wybranej pracy.

#### Endpointy dla koszyka i zamówień
6. **Stworzenie endpointu POST `/api/cart`**
   - Dodawanie produktu do koszyka.

7. **Stworzenie endpointu GET `/api/cart`**
   - Zwracanie zawartości koszyka.

8. **Stworzenie endpointu DELETE `/api/cart/<id>`**
   - Usuwanie produktu z koszyka.

9. **Stworzenie endpointu POST `/api/orders`**
   - Składanie zamówienia.

#### Endpointy dla rejestracji i logowania użytkowników
10. **Stworzenie endpointu POST `/api/register`**
    - Rejestracja nowego użytkownika.

11. **Stworzenie endpointu POST `/api/login`**
    - Logowanie użytkownika i generowanie tokenu autoryzacyjnego.

12. **Stworzenie endpointu GET `/api/user`**
    - Zwracanie danych zalogowanego użytkownika.

13. **Stworzenie endpointu PUT `/api/user`**
    - Aktualizowanie danych użytkownika.

### Baza danych
1. **Stworzenie modelu bazy danych dla prac**
   - Tabela `works` z polami: nazwa, opis, zdjęcie, cena, dostępność.

2. **Stworzenie modelu bazy danych dla użytkowników**
   - Tabela `users` z polami: email, hasło, imię.

3. **Stworzenie modelu bazy danych dla zamówień**
   - Tabela `orders` z polami: użytkownik, lista prac, status.

4. **Stworzenie modelu bazy danych dla koszyka**
   - Tabela `cart` z polami: użytkownik, lista prac.

Te zadania można przypisać do odpowiednich osób i śledzić postępy na tablicy Kanban.