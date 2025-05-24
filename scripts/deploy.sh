#!/bin/bash

# Django + React Deployment Script
# This script sets up the application for production deployment

set -e  # Exit on any error

echo "🚀 Starting Django + React Application Deployment"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

# Check if required commands exist
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 is required but not installed"
        exit 1
    fi
}

print_status "Checking required dependencies..."
check_command "python3"
check_command "npm"
check_command "git"

# Set deployment environment
ENVIRONMENT=${1:-"production"}
print_status "Deploying for environment: $ENVIRONMENT"

# Backend Setup
print_status "Setting up Django backend..."

# Activate virtual environment
if [ ! -d "env" ]; then
    print_status "Creating virtual environment..."
    python3 -m venv env
fi

source env/bin/activate
print_status "Virtual environment activated"

# Install Python dependencies
print_status "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Environment setup
if [ ! -f ".env" ]; then
    print_warning ".env file not found, creating from example..."
    cp .env.example .env
    print_warning "Please edit .env file with your production settings before continuing"
    read -p "Press Enter to continue after editing .env file..."
fi

# Database setup
print_status "Setting up database..."
python manage.py makemigrations
python manage.py migrate

# Create superuser if it doesn't exist
print_status "Checking for superuser..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(is_superuser=True).exists():
    print('Creating superuser...')
    import os
    User.objects.create_superuser(
        username=os.environ.get('ADMIN_USERNAME', 'admin'),
        email=os.environ.get('ADMIN_EMAIL', 'admin@example.com'),
        password=os.environ.get('ADMIN_PASSWORD', 'admin123')
    )
    print('Superuser created successfully')
else:
    print('Superuser already exists')
"

# Collect static files
print_status "Collecting static files..."
python manage.py collectstatic --noinput

# Frontend Setup
print_status "Setting up React frontend..."
cd frontend

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
npm install

# Build frontend for production
if [ "$ENVIRONMENT" = "production" ]; then
    print_status "Building frontend for production..."
    npm run build
    print_status "Frontend built successfully"
fi

cd ..

# Security checks
print_status "Running security checks..."
python manage.py check --deploy

# Test the setup
print_status "Testing the setup..."
python manage.py test --verbosity=2

print_status "✅ Deployment completed successfully!"
echo ""
echo "Next steps:"
echo "1. Configure your web server (nginx/apache)"
echo "2. Set up SSL certificates"
echo "3. Configure firewall rules"
echo "4. Set up monitoring and logging"
echo "5. Configure backup system"
echo ""
echo "To start the development server:"
echo "  Backend:  python manage.py runserver"
echo "  Frontend: cd frontend && npm start"
echo ""
echo "To start production server:"
echo "  Backend:  gunicorn core.wsgi:application"
echo "  Frontend: Serve the build/ directory with nginx"
