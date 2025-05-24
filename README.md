# Django + React Application

A full-stack web application built with Django REST Framework backend and React frontend.

## Features

- RESTful API with Django REST Framework
- React.js frontend with modern hooks
- CORS configured for frontend-backend communication
- SQLite database (development) / PostgreSQL ready
- Responsive design
- CRUD operations for items

## Project Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed file organization.

## Quick Start

### Backend Setup

1. Create and activate virtual environment:
```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create sample data:
```bash
python manage.py create_sample_data
```

5. Start Django development server:
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start React development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/` - API overview
- `GET /api/items/` - List all items
- `POST /api/items/` - Create new item
- `GET /api/items/{id}/` - Get specific item
- `PUT /api/items/{id}/` - Update specific item
- `DELETE /api/items/{id}/` - Delete specific item

## Technology Stack

### Backend
- Python 3.12
- Django 5.2.1
- Django REST Framework 3.16.0
- SQLite (development) / PostgreSQL (production)

### Frontend
- React 19.1.0
- Axios for API calls
- Modern CSS with Flexbox/Grid

## Development

### Adding New Features

1. **Backend (Django)**:
   - Create new models in `api/models/`
   - Add serializers in `api/serializers/`
   - Create views in `api/views/`
   - Update URL patterns in `api/urls.py`

2. **Frontend (React)**:
   - Create components in `src/components/`
   - Add pages in `src/pages/`
   - Update API calls in `src/services/`

### Testing

**Backend**:
```bash
python manage.py test
```

**Frontend**:
```bash
cd frontend
npm test
```

## Deployment

### Production Setup

1. Set environment variables:
```bash
export DEBUG=False
export SECRET_KEY="your-production-secret-key"
export DATABASE_URL="postgres://user:pass@localhost/dbname"
```

2. Install production dependencies:
```bash
pip install -r requirements.txt
```

3. Collect static files:
```bash
python manage.py collectstatic
```

4. Run with Gunicorn:
```bash
gunicorn core.wsgi:application
```

### Docker Deployment

See `config/docker/` for Docker configuration files.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
