# API Documentation

This document outlines the available API endpoints for managing users, tiers, and platforms in the application. The API is secured using JSON Web Tokens (JWT) for authentication.

## Base URL

The base URL for all API endpoints is `http://localhost:8080/api`.

## Authentication

To access authenticated endpoints, include a valid JWT token in the `Authorization` header using the Bearer scheme.

## Endpoints

### 1. User Registration

Register a new user.

- **Endpoint:** POST `/register`
- **Input:**
{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "phonenumber": "1234567890",
  "password": "mypassword",
  "address": "123 Main St",
  "credit_card_info": "1234-5678-9012-3456",
  "date_of_birth": "1990-01-01"
}

- **Output:**
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}

### 2. User Login
Authenticate a user and retrieve a JWT token.

- **Endpoint:** POST `/login`
- **Input:**
{
  "email": "alice@example.com",
  "password": "mypassword"
}

- **Output:**
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "status": true
}

### 3. Fetch All Tiers
Get a list of all available tiers.

- **Endpoint:** GET `/tiers`
- **Output:**
[
  {
    "id": 1,
    "tier": "Tier 1",
    "sharedInfo": ["Name", "Password", "Phone Number", ...],
    "platforms": ["live", "xbox"]
  },
  // ... other tiers ...
]

### 4. Create New Tier
Create a new tier.

- **Endpoint:** POST `/tiers`
- **Input:**
{
  "tier": "Tier 3",
  "sharedInfo": ["Name", "Password", "Phone Number", ...],
  "platforms": ["instagram", "twitter"]
}

- **Output:**
{
  "message": "Tier created successfully"
}

### 5. Edit Tier
Edit an existing tier.

- **Endpoint:** PUT `/tiers/:id`
- **Input:**
{
  "tier": "Tier 3 (Updated)",
  "sharedInfo": ["Name", "Password", "Phone Number", ...],
  "platforms": ["twitter", "linkedin"]
}

- **Output:**
{
  "message": "Tier updated successfully"
}

### 6. Fetch All Users
Get a list of all registered users.

- **Endpoint:** GET `/users`
- **Output:**
[
  {
    "id": 1,
    "name": "Alice Smith",
    "email": "alice@example.com",
    // ... other user properties ...
  },
  // ... other users ...
]

### 7. Edit User
Edit user information.

- **Endpoint:** PUT `/users/:id`
- **Input:**
{
  "name": "Alice Johnson",
  "email": "alice.j@example.com"
}

- **Output:**
{
  "message": "User updated successfully"
}

### 8. Fetch Current User
Get information about the authenticated user.

- **Endpoint:** GET `/me`
- **Output:**
{
  "id": 1,
  "name": "Alice Smith",
  "email": "alice@example.com",
  // ... other user properties ...
}

### 9. Fetch All Platforms
Get a list of all available platforms.

- **Endpoint:** GET `/platforms`
- **Output:**
[
  {
    "id": 1,
    "name": "live",
    "info_access": ["Name", "Password", "Phone Number", ...]
  },
  // ... other platforms ...
]

### 10. Fetch Platform by ID
Get details about a specific platform.

- **Endpoint:** GET `/platforms/:id`
- **Output:**
{
  "id": 1,
  "name": "live",
  "info_access": ["Name", "Password", "Phone Number", ...]
}

### 11. Create New Platform
Create a new platform.

- **Endpoint:** POST `/platforms`
- **Input:**
{
  "name": "myplatform",
  "info_access": ["Name", "Email", "Date of Birth", ...]
}

- **Output:**
{
  "message": "Platform created successfully"
}

### 12. Edit Platform
Edit an existing platform.

- **Endpoint:** PUT `/platforms/:id`
- **Input:**
{
  "name": "myplatform (Updated)",
  "info_access": ["Name", "Phone Number", "Address", ...]
}

- **Output:**
{
  "message": "Platform updated successfully"
}

### 13. Delete Platform
Delete a platform.

- **Endpoint:** DELETE `/platforms/:id`
- **Output:**
{
  "message": "Platform deleted successfully"
}

## Running the Server
To run the server, execute the following command:
npm install
node index.js
The server will run on port 8080.

```
