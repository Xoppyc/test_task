## API Routes

### Auth

| Method | Route            | Auth | Role | Body                             |
| ------ | ---------------- | ---- | ---- | -------------------------------- |
| POST   | /api/auth/signup | none | -    | { name, email, password, role? } |
| POST   | /api/auth/login  | none | -    | { email, password }              |

### Books

| Method | Route          | Auth  | Role  | Body                           |
| ------ | -------------- | ----- | ----- | ------------------------------ |
| GET    | /api/books     | token | any   | -                              |
| GET    | /api/books/:id | token | any   | -                              |
| POST   | /api/books     | token | admin | { name, author, pageCount }    |
| PUT    | /api/books/:id | token | admin | { name?, author?, pageCount? } |
| DELETE | /api/books/:id | token | admin | -                              |

### Users

| Method | Route          | Auth  | Role  | Body                                |
| ------ | -------------- | ----- | ----- | ----------------------------------- |
| GET    | /api/users     | token | admin | -                                   |
| GET    | /api/users/:id | token | admin | -                                   |
| POST   | /api/users     | token | admin | { name, email, password, role? }    |
| PUT    | /api/users/:id | token | admin | { name?, email?, password?, role? } |
| DELETE | /api/users/:id | token | admin | -                                   |

## Role-based Access

| Action                       | User | Admin |
| ---------------------------- | ---- | ----- |
| View books                   | ✅   | ✅    |
| Create / edit / delete books | ❌   | ✅    |
| View users                   | ❌   | ✅    |
| Create / edit / delete users | ❌   | ✅    |

## Environment Variables

| Variable       | Description                       |
| -------------- | --------------------------------- |
| PORT           | Port the server runs on           |
| MONGO_URI      | MongoDB connection string         |
| MONGO_URI_TEST | MongoDB test database URI         |
| JWT_SECRET     | Secret key for signing JWT tokens |

## Setup

1. Install dependencies
   cd backend && npm install
   cd frontend && npm install

2. Create .env in backend/ with the variables above

3. Run backend
   npm start

4. Run frontend
   npm run dev

5. Run tests
   cd backend && npm test
