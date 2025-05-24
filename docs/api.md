# API Documentation

## Base URL
- Development: `http://localhost:8000/api/`
- Production: `https://yourdomain.com/api/`

## Authentication
Currently, the API does not require authentication, but it's recommended to implement authentication for production use.

## Endpoints

### Items

#### List all items
- **GET** `/api/items/`
- **Response**: Array of item objects

```json
[
  {
    "id": 1,
    "name": "Sample Item",
    "description": "This is a sample item",
    "price": "10.99",
    "created_at": "2025-05-24T10:30:00Z"
  }
]
```

#### Create a new item
- **POST** `/api/items/`
- **Request Body**:

```json
{
  "name": "New Item",
  "description": "Description of the new item",
  "price": "15.99"
}
```

- **Response**: Created item object

#### Get specific item
- **GET** `/api/items/{id}/`
- **Response**: Item object

#### Update specific item
- **PUT** `/api/items/{id}/`
- **Request Body**: Same as create

#### Partially update item
- **PATCH** `/api/items/{id}/`
- **Request Body**: Only fields to update

#### Delete specific item
- **DELETE** `/api/items/{id}/`
- **Response**: `204 No Content`

### API Overview
- **GET** `/api/`
- **Response**: Available endpoints

```json
{
  "List": "/api/items/",
  "Detail View": "/api/items/<int:id>/",
  "Create": "/api/items/",
  "Update": "/api/items/<int:id>/",
  "Delete": "/api/items/<int:id>/"
}
```

## Error Handling

### Common HTTP Status Codes
- `200 OK` - Successful GET, PUT, PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Error Response Format
```json
{
  "error": "Error message",
  "details": {
    "field_name": ["Field specific error"]
  }
}
```

## Filtering and Pagination

### Filtering (to be implemented)
- Filter by name: `/api/items/?name=search_term`
- Filter by price range: `/api/items/?min_price=10&max_price=50`

### Pagination (to be implemented)
- Page size: `/api/items/?page_size=10`
- Page number: `/api/items/?page=2`

## Rate Limiting
Currently not implemented, but recommended for production.

## CORS
CORS is configured to allow requests from:
- `http://localhost:3000` (React development server)
- `http://127.0.0.1:3000`
