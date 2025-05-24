#!/bin/bash

# Django + React Application Setup Script
# This script helps set up the application for development

set -e  # Exit on any error

echo "🚀 Django + React Application Setup"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_header() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if running in correct directory
if [[ ! -f "manage.py" ]]; then
    print_error "This script must be run from the Django project root directory"
    exit 1
fi

print_header "1. Setting up Python Virtual Environment"

# Create virtual environment if it doesn't exist
if [ ! -d "env" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv env
else
    print_status "Virtual environment already exists"
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source env/bin/activate

print_header "2. Installing Python Dependencies"
pip install --upgrade pip
pip install -r requirements.txt

print_header "3. Setting up Environment Variables"
if [ ! -f ".env" ]; then
    print_status "Creating .env file from example..."
    cp .env.example .env
    print_warning "Please review and update .env file with your settings"
else
    print_status ".env file already exists"
fi

print_header "4. Setting up Database"
print_status "Running database migrations..."
python manage.py makemigrations
python manage.py migrate

print_status "Creating sample data..."
python manage.py create_sample_data

print_header "5. Setting up Frontend"
cd frontend

print_status "Installing Node.js dependencies..."
npm install

# Create frontend .env if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating frontend .env file..."
    echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
else
    print_status "Frontend .env file already exists"
fi

cd ..

print_header "6. Running Tests"
print_status "Running Django tests..."
python manage.py test

print_status "Running React tests..."
cd frontend
npm test -- --watchAll=false
cd ..

print_status "✅ Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Start the Django development server:"
echo "   ${GREEN}python manage.py runserver${NC}"
echo ""
echo "2. In a new terminal, start the React development server:"
echo "   ${GREEN}cd frontend && npm start${NC}"
echo ""
echo "3. Open your browser and navigate to:"
echo "   ${BLUE}Frontend: http://localhost:3000${NC}"
echo "   ${BLUE}Backend API: http://localhost:8000/api/${NC}"
echo "   ${BLUE}Django Admin: http://localhost:8000/admin/${NC}"
echo ""
echo "4. Create a Django superuser (optional):"
echo "   ${GREEN}python manage.py createsuperuser${NC}"
echo ""
echo "📚 Documentation:"
echo "================="
echo "   ${BLUE}Project Structure: PROJECT_STRUCTURE.md${NC}"
echo "   ${BLUE}API Documentation: docs/api.md${NC}"
echo "   ${BLUE}Development Guide: docs/development.md${NC}"
echo ""
echo "Happy coding! 🎉"
