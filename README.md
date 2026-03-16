# Pinky&Bluey Car Care Services - Service Marketplace

A full-stack web application for connecting users with service providers. Built with Django REST Framework backend and React frontend, featuring a unique pink theme.

## Features

- **User Authentication**: JWT-based login/signup
- **Role-based Access**: Admin, Seller, User roles
- **Service Listings**: Browse and book services
- **Seller Dashboard**: Manage services and orders
- **Admin Panel**: User management and seller approvals
- **AI Chatbot**: Project-specific assistant
- **PayPal Integration**: Multi-merchant payment processing

## Tech Stack

- **Backend**: Django 6.0, Django REST Framework, Simple JWT
- **Frontend**: React 19, Redux, React Router, Bootstrap 5
- **Database**: SQLite (development)
- **Styling**: Custom pink theme with Bootstrap

## Setup Instructions

### Prerequisites

- Python 3.13+
- Node.js 16+
- Git

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python3 -m venv ../venv
   source ../venv/bin/activate  # On Windows: ../venv/Scripts/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Create superuser (admin):
   ```bash
   python manage.py createsuperuser
   ```

6. Start backend server:
   ```bash
   python manage.py runserver
   ```

Backend will run on http://127.0.0.1:8000

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

Frontend will run on http://localhost:3000 (proxied to backend)

### Environment Variables

Create `.env` file in backend directory with:
```
SECRET_KEY=your-secret-key
DEBUG=True
```

## API Endpoints

- `/api/v1/users/login/` - User login
- `/api/v1/users/register/` - User registration
- `/api/v1/services/list/` - Public service listings
- `/api/v1/applications/apply/` - Seller application
- `/api/v1/chat/ask/` - AI chatbot

## Usage

1. Register as a user
2. Apply to become a seller (admin approval required)
3. Browse services on home page
4. Sellers can manage services in dashboard
5. Admins can approve sellers and manage users

## Project Structure

```
quiz6/
├── backend/
│   ├── backend/          # Django settings
│   ├── users/            # User auth & profiles
│   ├── applications/     # Seller applications
│   ├── services/         # Service CRUD
│   ├── orders/           # Order tracking
│   ├── chat/             # AI chatbot
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── screens/      # Page components
│   │   ├── actions/      # Redux actions
│   │   ├── reducers/     # Redux reducers
│   │   └── store.js      # Redux store
│   └── package.json
└── README.md
```

## Contributing

This is a solo project. No external contributors.

## License

All rights reserved.

