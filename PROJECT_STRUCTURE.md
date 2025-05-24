# Django + React Application File Structure

## Project Overview
This is a full-stack web application with:
- **Backend**: Django REST Framework API
- **Frontend**: React.js SPA (Single Page Application)
- **Database**: SQLite (development) / PostgreSQL (production ready)

## Complete File Structure

```
django_app/
├── README.md                           # Project documentation
├── requirements.txt                    # Python dependencies
├── .env                               # Environment variables (create this)
├── .gitignore                         # Git ignore file
├── manage.py                          # Django management script
│
├── core/                              # Django project settings
│   ├── __init__.py
│   ├── settings/                      # Split settings (recommended)
│   │   ├── __init__.py
│   │   ├── base.py                   # Base settings
│   │   ├── development.py            # Development settings
│   │   ├── production.py             # Production settings
│   │   └── testing.py                # Testing settings
│   ├── urls.py                       # Main URL configuration
│   ├── wsgi.py                       # WSGI configuration
│   └── asgi.py                       # ASGI configuration
│
├── api/                              # Main API app
│   ├── __init__.py
│   ├── apps.py
│   ├── admin.py
│   ├── models/                       # Split models into modules
│   │   ├── __init__.py
│   │   ├── item.py                   # Item model
│   │   └── user.py                   # User-related models (if needed)
│   ├── serializers/                  # Split serializers
│   │   ├── __init__.py
│   │   ├── item.py                   # Item serializers
│   │   └── user.py                   # User serializers
│   ├── views/                        # Split views
│   │   ├── __init__.py
│   │   ├── item.py                   # Item views
│   │   └── user.py                   # User views
│   ├── urls.py                       # API URL patterns
│   ├── permissions.py                # Custom permissions
│   ├── filters.py                    # Custom filters
│   ├── pagination.py                 # Custom pagination
│   ├── utils.py                      # Utility functions
│   ├── tests/                        # Test modules
│   │   ├── __init__.py
│   │   ├── test_models.py
│   │   ├── test_views.py
│   │   ├── test_serializers.py
│   │   └── test_utils.py
│   ├── migrations/                   # Database migrations
│   │   ├── __init__.py
│   │   └── 0001_initial.py
│   └── management/                   # Custom management commands
│       ├── __init__.py
│       └── commands/
│           ├── __init__.py
│           ├── create_sample_data.py
│           └── seed_database.py
│
├── authentication/                   # Authentication app (if needed)
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── permissions.py
│   └── utils.py
│
├── common/                          # Shared utilities
│   ├── __init__.py
│   ├── exceptions.py                # Custom exceptions
│   ├── middleware.py                # Custom middleware
│   ├── validators.py                # Custom validators
│   └── utils.py                     # Common utilities
│
├── static/                          # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   ├── images/
│   └── admin/                       # Django admin static files
│
├── media/                           # User uploaded files
│   └── uploads/
│
├── templates/                       # Django templates (if using server-side rendering)
│   ├── base.html
│   └── admin/                       # Custom admin templates
│
├── locale/                          # Internationalization files
│   ├── en/
│   └── es/                          # Example: Spanish translations
│
├── docs/                            # Project documentation
│   ├── api.md                       # API documentation
│   ├── deployment.md                # Deployment guide
│   └── development.md               # Development setup
│
├── scripts/                         # Utility scripts
│   ├── deploy.sh                    # Deployment script
│   ├── backup.sh                    # Database backup script
│   └── setup.sh                     # Initial setup script
│
├── frontend/                        # React frontend
│   ├── package.json                 # Node.js dependencies
│   ├── package-lock.json            # Locked dependency versions
│   ├── .env                         # Frontend environment variables
│   ├── .gitignore                   # Frontend git ignore
│   ├── README.md                    # Frontend documentation
│   │
│   ├── public/                      # Static public files
│   │   ├── index.html               # Main HTML template
│   │   ├── favicon.ico              # Site icon
│   │   ├── manifest.json            # PWA manifest
│   │   ├── robots.txt               # SEO robots file
│   │   └── logo192.png              # App logos
│   │
│   ├── src/                         # Source code
│   │   ├── index.js                 # React entry point
│   │   ├── index.css                # Global styles
│   │   ├── App.js                   # Main App component
│   │   ├── App.css                  # App styles
│   │   ├── App.test.js              # App tests
│   │   │
│   │   ├── components/              # Reusable components
│   │   │   ├── common/              # Common UI components
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.js
│   │   │   │   │   ├── Button.css
│   │   │   │   │   └── Button.test.js
│   │   │   │   ├── Modal/
│   │   │   │   │   ├── Modal.js
│   │   │   │   │   ├── Modal.css
│   │   │   │   │   └── Modal.test.js
│   │   │   │   ├── Loading/
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   └── Layout/
│   │   │   │
│   │   │   ├── items/               # Item-specific components
│   │   │   │   ├── ItemCard/
│   │   │   │   │   ├── ItemCard.js
│   │   │   │   │   ├── ItemCard.css
│   │   │   │   │   └── ItemCard.test.js
│   │   │   │   ├── ItemForm/
│   │   │   │   ├── ItemList/
│   │   │   │   └── ItemDetail/
│   │   │   │
│   │   │   └── forms/               # Form components
│   │   │       ├── ContactForm/
│   │   │       └── SearchForm/
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── Home/
│   │   │   │   ├── Home.js
│   │   │   │   ├── Home.css
│   │   │   │   └── Home.test.js
│   │   │   ├── About/
│   │   │   ├── Items/
│   │   │   ├── Contact/
│   │   │   └── NotFound/
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useApi.js            # API hook
│   │   │   ├── useAuth.js           # Authentication hook
│   │   │   ├── useLocalStorage.js   # Local storage hook
│   │   │   └── useDebounce.js       # Debounce hook
│   │   │
│   │   ├── context/                 # React Context providers
│   │   │   ├── AuthContext.js       # Authentication context
│   │   │   ├── ThemeContext.js      # Theme context
│   │   │   └── ApiContext.js        # API context
│   │   │
│   │   ├── services/                # API and external services
│   │   │   ├── api.js               # Main API service
│   │   │   ├── itemService.js       # Item-specific API calls
│   │   │   ├── authService.js       # Authentication API
│   │   │   └── utils.js             # Service utilities
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── constants.js         # App constants
│   │   │   ├── helpers.js           # Helper functions
│   │   │   ├── formatters.js        # Data formatters
│   │   │   └── validators.js        # Form validators
│   │   │
│   │   ├── styles/                  # Global styles and themes
│   │   │   ├── globals.css          # Global CSS variables
│   │   │   ├── variables.css        # CSS custom properties
│   │   │   ├── mixins.css           # CSS mixins
│   │   │   └── components.css       # Component base styles
│   │   │
│   │   ├── assets/                  # Static assets
│   │   │   ├── images/              # Image files
│   │   │   ├── icons/               # Icon files
│   │   │   ├── fonts/               # Font files
│   │   │   └── videos/              # Video files
│   │   │
│   │   └── __tests__/               # Test utilities and setup
│   │       ├── setupTests.js        # Test setup
│   │       ├── testUtils.js         # Test utilities
│   │       └── mocks/               # Mock data and services
│   │           ├── mockApi.js
│   │           └── mockData.js
│   │
│   ├── build/                       # Production build (generated)
│   └── node_modules/                # Node dependencies (generated)
│
├── config/                          # Configuration files
│   ├── nginx/                       # Nginx configuration
│   │   └── django_app.conf
│   ├── supervisor/                  # Supervisor configuration
│   │   └── django_app.conf
│   └── docker/                      # Docker configuration
│       ├── Dockerfile.backend
│       ├── Dockerfile.frontend
│       └── docker-compose.yml
│
├── logs/                            # Application logs
│   ├── django.log
│   ├── error.log
│   └── access.log
│
├── backups/                         # Database backups
│   └── daily/
│
└── env/                             # Python virtual environment
    ├── bin/
    ├── include/
    ├── lib/
    └── pyvenv.cfg
```

## Key Files Descriptions

### Backend (Django)

- **manage.py**: Django's command-line utility for administrative tasks
- **core/settings/**: Split settings for different environments
- **api/models/**: Database models organized by feature
- **api/serializers/**: DRF serializers for API data transformation
- **api/views/**: API views handling HTTP requests
- **api/urls.py**: URL routing for API endpoints
- **requirements.txt**: Python package dependencies

### Frontend (React)

- **package.json**: Node.js dependencies and scripts
- **src/index.js**: React application entry point
- **src/App.js**: Main application component
- **src/components/**: Reusable UI components organized by feature
- **src/pages/**: Full page components
- **src/services/**: API communication logic
- **src/hooks/**: Custom React hooks for shared logic
- **src/context/**: React Context for global state management

## Environment Files

### Backend (.env)
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_VERSION=1.0.0
```

## Dependencies

### Backend (requirements.txt)
```
Django==5.2.1
djangorestframework==3.16.0
django-cors-headers==4.7.0
python-decouple==3.8
psycopg2-binary==2.9.10
gunicorn==21.2.0
```

### Frontend (package.json dependencies)
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "axios": "^1.9.0",
  "react-router-dom": "^6.8.0",
  "@testing-library/react": "^16.3.0"
}
```

This structure provides:
- **Scalability**: Easy to add new features and apps
- **Maintainability**: Clear separation of concerns
- **Testing**: Comprehensive test organization
- **Deployment**: Ready for production deployment
- **Development**: Clear development workflow
