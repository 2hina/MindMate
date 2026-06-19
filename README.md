# 🌿 MindMate — AI Mental Wellness Platform

A full-stack mental wellness web application built with **React** (frontend) and **Django + Django REST Framework** (backend), featuring JWT authentication, mood tracking, stress analysis, AI companion chat, and therapist discovery.


🌿 **Live:** [mind-mate-khaki.vercel.app](https://mind-mate-khaki.vercel.app) — your mental wellness companion, deployed and ready to use.


---

## 📁 Project Structure

```
mindmate/
├── frontend/                   # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/                # Axios API layer
│   │   │   ├── axios.js        # Base Axios instance
│   │   │   ├── auth.js         # Auth API calls
│   │   │   ├── moods.js        # Mood API calls
│   │   │   ├── stress.js       # Stress API calls
│   │   │   ├── chat.js         # Chat API calls
│   │   │   └── therapists.js   # Therapists API calls
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state
│   │   ├── components/
│   │   │   ├── Background.jsx
│   │   │   ├── Nav.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MoodJournal.jsx
│   │   │   ├── StressCheck.jsx
│   │   │   ├── AIChat.jsx
│   │   │   ├── Therapists.jsx
│   │   │   ├── CalmZone.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── FrontPage.jsx   # Auth gate landing page
│   │   │   └── AppPage.jsx     # Main app (post-auth)
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
└── backend/                    # Django application
    ├── mindmate/               # Project config
    │   ├── settings.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   └── asgi.py
    ├── apps/
    │   ├── users/              # Auth & user management
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── views.py
    │   │   └── urls.py
    │   ├── moods/              # Mood journal
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── views.py
    │   │   ├── admin.py
    │   │   └── urls.py
    │   ├── stress/             # Stress analysis
    │   │   ├── views.py
    │   │   └── urls.py
    │   ├── chat/               # AI companion
    │   │   ├── views.py
    │   │   └── urls.py
    │   └── therapists/         # Therapist listings
    │       ├── models.py
    │       ├── serializers.py
    │       ├── views.py
    │       ├── admin.py
    │       └── urls.py
    ├── manage.py
    ├── requirements.txt
    └── .env.example
```

---

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # edit values
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata therapists  # optional seed data
python manage.py runserver
# → http://localhost:8000
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env            # set REACT_APP_API_URL
npm start
# → http://localhost:3000
```

---

## 🔑 API Endpoints

| Method | Endpoint                  | Description              | Auth |
|--------|---------------------------|--------------------------|------|
| POST   | `/api/auth/register/`     | Create account           | No   |
| POST   | `/api/auth/login/`        | Obtain JWT tokens        | No   |
| POST   | `/api/auth/token/refresh/`| Refresh access token     | No   |
| GET    | `/api/auth/me/`           | Current user profile     | Yes  |
| GET    | `/api/moods/`             | List user moods          | Yes  |
| POST   | `/api/moods/`             | Log a new mood           | Yes  |
| DELETE | `/api/moods/<id>/`        | Delete a mood entry      | Yes  |
| POST   | `/api/stress/analyze/`    | Analyze stress from text | Yes  |
| POST   | `/api/chat/`              | Send message to AI       | Yes  |
| GET    | `/api/therapists/`        | List all therapists      | Yes  |
| GET    | `/api/therapists/<id>/`   | Therapist detail         | Yes  |

---

## 🛡️ Auth Flow

```
User submits login form
  → POST /api/auth/login/  { email, password }
  ← { access: "JWT...", refresh: "JWT..." }
  → Store tokens in localStorage
  → Attach Authorization: Bearer <access> to all requests
  → On 401, POST /api/auth/token/refresh/ with refresh token
```
