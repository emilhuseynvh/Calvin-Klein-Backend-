# Calvin Klein E-commerce Backend

A robust Node.js/Express.js backend for the Calvin Klein e-commerce platform with features like authentication, product management, category management, and image upload capabilities.

## Features

- 🔐 **Authentication**
  - User registration
  - User login with JWT
  - Role-based authorization (Admin/User)

- 👤 **User Management**
  - Update user profile
  - User role management

- 📦 **Product Management**
  - Create, read, update, and delete products
  - Product variants support
  - Product filtering and search
  - Category-based organization

- 📁 **Category Management**
  - Hierarchical category structure
  - CRUD operations for categories
  - Nested category listing

- 🖼️ **Image Upload**
  - Secure image upload system
  - Support for JPEG, PNG, WebP, and GIF
  - Image storage management

- 📚 **API Documentation**
  - Interactive Swagger documentation at `/docs`
  - Detailed API specifications
  - Request/response examples

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Swagger UI for API documentation

## Prerequisites

- Node.js (v20.15.0 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory with the following variables:
   ```env
   PORT=3002
   DATABASE_URL=mongodb://localhost:27017/calvin-klein
   JWT_SECRET=your-secret-key
   ```

4. Create an upload directory in the root:
   ```bash
   mkdir upload
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation

Once the server is running, you can access the API documentation at:
```
http://localhost:3002/docs
```

The documentation includes:
- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements
- Example requests

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration

### Users
- POST `/api/user` - Update user profile

### Products
- GET `/api/product` - List products
- POST `/api/product` - Create product
- POST `/api/product/:id` - Update product
- POST `/api/product/:id/variant` - Add/update product variant
- DELETE `/api/product/:id` - Delete product

### Categories
- GET `/api/category` - Get nested categories
- POST `/api/category` - Create category
- POST `/api/category/:id` - Update category
- DELETE `/api/category/:id` - Delete category

### Images
- POST `/api/image` - Upload image

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
{
  "error": {
    "message": "Error description"
  }
}
```

## Security

- JWT-based authentication
- Role-based access control
- Input validation
- File type validation for uploads
- Error handling middleware

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
