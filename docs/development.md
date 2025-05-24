# Development Setup Guide

## Prerequisites

- Python 3.8+ (recommended 3.12)
- Node.js 16+ (recommended 18+)
- Git

## Backend Setup

### 1. Clone and Setup Virtual Environment

```bash
git clone <repository-url>
cd django_app

# Create virtual environment
python -m venv env

# Activate virtual environment
# On Linux/Mac:
source env/bin/activate
# On Windows:
env\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your settings
nano .env
```

### 4. Database Setup

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Load sample data
python manage.py create_sample_data
```

### 5. Start Development Server

```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

```bash
# Create frontend environment file
cp .env.example .env

# Edit with your API URL
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
```

### 4. Start Development Server

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Development Workflow

### Backend Development

1. **Adding New Models**:
   ```bash
   # After creating models
   python manage.py makemigrations
   python manage.py migrate
   ```

2. **Running Tests**:
   ```bash
   python manage.py test
   ```

3. **Django Admin**:
   - Access at `http://localhost:8000/admin/`
   - Use superuser credentials

### Frontend Development

1. **Component Development**:
   - Create components in `src/components/`
   - Follow the folder structure in PROJECT_STRUCTURE.md

2. **Running Tests**:
   ```bash
   npm test
   ```

3. **Building for Production**:
   ```bash
   npm run build
   ```

## Code Style Guidelines

### Backend (Python)

- Follow PEP 8
- Use Black for formatting: `pip install black && black .`
- Use flake8 for linting: `pip install flake8 && flake8`

### Frontend (JavaScript)

- Use ESLint and Prettier
- Follow Airbnb style guide
- Use functional components with hooks

## Database Management

### SQLite (Development)
- Database file: `db.sqlite3`
- View with DB Browser for SQLite

### PostgreSQL (Production)
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb django_app

# Update .env with PostgreSQL URL
DATABASE_URL=postgres://username:password@localhost/django_app
```

## Debugging

### Backend Debugging
- Use Django Debug Toolbar: `pip install django-debug-toolbar`
- Add breakpoints with `import pdb; pdb.set_trace()`
- Check Django logs in terminal

### Frontend Debugging
- Use React Developer Tools browser extension
- Use browser's developer console
- Add `console.log()` statements for debugging

## Common Issues

### CORS Errors
- Ensure `django-cors-headers` is installed
- Check CORS_ALLOWED_ORIGINS in settings
- Verify frontend is running on allowed origin

### Database Issues
- Delete `db.sqlite3` and run migrations again
- Check migration files for conflicts
- Use `python manage.py dbshell` for direct database access

### Node/npm Issues
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Useful Commands

### Django
```bash
# Create new app
python manage.py startapp app_name

# Create migration
python manage.py makemigrations app_name

# Shell with Django context
python manage.py shell

# Collect static files
python manage.py collectstatic
```

### React
```bash
# Add new dependency
npm install package-name

# Update dependencies
npm update

# Analyze bundle size
npm run build && npx serve -s build
```
