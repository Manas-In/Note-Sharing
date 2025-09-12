# 📝 Notes App

A full-stack **Notes Application** built with **Django REST Framework (backend)** and **React (frontend)**.  
It allows users to **register, log in, create, update, delete, and categorize notes** securely with JWT authentication.

---

## 🚀 Features
- User authentication (Login, Signup, JWT Tokens with Refresh & Access).
- Create, update, delete, and view personal notes.
- Category support (e.g., Business, Personal, Important).
- Secure API with **Django REST Framework**.
- Modern, responsive frontend using **React + TailwindCSS**.
- Token auto-refresh handled via Axios interceptors.

---

## 🛠️ Tech Stack
### Backend (Django + DRF)
- Django
- Django REST Framework
- djangorestframework-simplejwt (JWT Authentication)
- SQLite / PostgreSQL (choose your DB)

### Frontend (React)
- React (Vite)
- Axios (API requests + JWT handling)
- TailwindCSS (styling)
- React Router (navigation)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/notes-app.git
cd notes-app
```

---

### 2️⃣ Backend Setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # on Windows use venv\Scripts\activate
pip install -r requirements.txt
```

- Run migrations:
```bash
python manage.py migrate
```

- Create superuser:
```bash
python manage.py createsuperuser
```

- Start server:
```bash
python manage.py runserver
```
Backend runs at: `http://127.0.0.1:8000/`

---

### 3️⃣ Frontend Setup (React)
```bash
cd frontend
npm install
```

- Create `.env` file in `frontend/`:
```
VITE_BACKEND_BASE_API=http://127.0.0.1:8000
```

- Run frontend:
```bash
npm run dev
```
Frontend runs at: `http://localhost:5173/`

---

## 🔑 Authentication Flow
1. User logs in → gets **Access Token + Refresh Token**.
2. Access token auto-attached via Axios interceptor.
3. If Access token expires → interceptor uses Refresh token to fetch a new one.
4. If Refresh token is invalid/expired → user is logged out.

---

## 📂 Project Structure
```
notes-app/
│
├── backend/         # Django backend (API)
│   ├── notes/       # Notes app (models, views, urls)
│   ├── users/       # Custom user & auth
│   └── settings.py
│
├── frontend/        # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page-level components
│   │   ├── utils/        # Axios instance
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

## 📸 Screenshots (Optional)
_Add some screenshots of your UI here._

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss.

---

## 📜 License
MIT License © 2025 [Your Name]
