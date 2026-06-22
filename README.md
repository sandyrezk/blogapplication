# 🚀 Blog Application API

A scalable and production-ready RESTful API for a modern blogging platform, built with **Node.js**, **Express.js**, and **MongoDB** following the **MVC Architecture Pattern**. The API provides secure authentication, content management, category organization, media uploads, and interactive user engagement through comments.

Designed with maintainability, scalability, and clean code principles in mind, this project demonstrates backend development best practices and serves as a solid foundation for building blogging platforms, content management systems, and social publishing applications.

---

# ✨ Key Highlights

* Secure JWT Authentication & Authorization
* Role-Based Access Control
* Complete CRUD Operations
* MongoDB Database Integration
* Cloudinary Image Upload Support
* Swagger/OpenAPI Documentation
* Modular MVC Architecture
* Error Handling & Validation
* RESTful API Design Principles
* Scalable Project Structure

---

# 📌 Project Overview

The Blog Application API enables users to create accounts, publish articles, upload images, organize content using categories, and interact with posts through comments.

The system is designed to separate concerns using the MVC pattern, ensuring clean architecture and maintainable code. Every module is structured independently, making future enhancements and scaling significantly easier.

---

# 🛠 Technology Stack

| Layer                     | Technology           |
| ------------------------- | -------------------- |
| Runtime Environment       | Node.js              |
| Backend Framework         | Express.js           |
| Database                  | MongoDB              |
| ODM                       | Mongoose             |
| Authentication            | JWT (JSON Web Token) |
| Password Security         | bcryptjs             |
| File Storage              | Cloudinary           |
| API Documentation         | Swagger / OpenAPI    |
| Architecture              | MVC                  |
| Environment Configuration | dotenv               |

---

# 🔐 Authentication & Authorization

Authentication is implemented using JSON Web Tokens (JWT), ensuring secure and stateless communication between clients and the API.

### Features

* User Registration
* User Login
* Password Hashing with bcrypt
* JWT Token Generation
* Protected Routes
* User Authorization Middleware

### Authentication Flow

1. User registers an account.
2. Password is encrypted before storage.
3. User logs in with valid credentials.
4. Server generates a JWT token.
5. Token is used to access protected endpoints.

---

# 📝 Blog Posts Module

The Posts Module serves as the core feature of the application.

### Capabilities

* Create New Posts
* Retrieve All Posts
* Retrieve Single Post
* Update Existing Posts
* Delete Posts
* Associate Posts with Categories
* Associate Posts with Authors
* Upload Post Images

### Post Information

Each post can include:

* Title
* Description
* Content
* Featured Image
* Category
* Author
* Creation Date

---

# 📂 Categories Module

Categories help organize blog content and improve discoverability.

### Supported Operations

* Create Category
* Retrieve Categories
* Update Category
* Delete Category
* Assign Posts to Categories

Examples:

* Technology
* Programming
* Lifestyle
* Business
* Education

---

# 💬 Comments Module

The commenting system enables user engagement and discussion around blog posts.

### Features

* Add Comment
* View Comments
* Delete Comment
* Associate Comments with Posts
* Associate Comments with Users

This creates a complete interaction layer between readers and content creators.

---

# 🖼 Media Uploads

Cloudinary is integrated for efficient cloud-based media management.

### Supported Features

* Image Upload
* Cloud Storage
* Secure Media URLs
* Optimized Delivery

Images can be attached to:

* User Profiles
* Blog Posts

---

# ⚙️ Validation & Error Handling

To ensure reliability and maintain data integrity, the API includes:

### Validation

* Required Fields Validation
* Input Sanitization
* Request Validation Middleware

### Error Handling

* Global Error Handler
* Consistent Error Responses
* HTTP Status Code Management
* Custom Error Messages

---

# 📖 API Documentation

Interactive API documentation is provided using Swagger.

### Benefits

* Endpoint Exploration
* Request Testing
* Response Examples
* Parameter Documentation

Access Swagger UI through:

```bash
http://localhost:8000/api-docs
```

---

# 📡 Main API Resources

## Authentication

```bash
/api/auth/register
/api/auth/login
```

## Users

```bash
/ api/users
```

## Posts

```bash
/ api/posts
```

## Categories

```bash
/ api/categories
```

## Comments

```bash
/ api/comments
```

---

# 📁 Project Structure

```text
blogapplication/
│
├── config/
│   └── connectToDb.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── postController.js
│   ├── commentController.js
│   └── categoryController.js
│
├── middleware/
│   ├── verifyToken.js
│   ├── errorMiddleware.js
│   └── validationMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│   └── Category.js
│
├── routes/
│   ├── authRoute.js
│   ├── usersRoute.js
│   ├── postsRoute.js
│   ├── commentRoute.js
│   └── categoryRoute.js
│
├── utils/
│   └── cloudinary.js
│
├── swagger.js
├── app.js
├── .env
├── package.json
└── README.md
```

---

# 🚀 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/sandyrezk/blogapplication.git
```

### Navigate to Project

```bash
cd blogapplication
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file and add:

```env
PORT=8000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

# 🎯 Future Improvements

* User Roles (Admin / Author / Reader)
* Post Likes & Reactions
* Bookmarking System
* Email Verification
* Password Reset
* Search & Filtering
* Pagination
* Notifications
* Real-Time Comments
* Unit & Integration Testing

---

# 👩‍💻 Author

**Sandy Rezk**

Backend Developer specializing in building scalable REST APIs using Node.js, Express.js, and MongoDB.

GitHub:
https://github.com/sandyrezk
  
