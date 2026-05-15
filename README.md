# What is this?

Welcome. This is my app — a test task I made to apply for a job. It has users, books, JWT, roles, a frontend, and a backend. It does not have bugs (do not check).

# How do I get this to work?

This process has steps, but I promise they're really short.

## 1. Create a MongoDB Atlas cluster

1. Go [here](https://www.mongodb.com/products/platform/atlas-database) and register or log in.
2. Hit **"Deploy your cluster"**, pick a name, pick a region with a low carbon footprint (save the planet while you test my app).
3. Create a database user — don't forget to copy your credentials somewhere. Not just "mentally remember" them.
4. Choose **Drivers**, copy your MongoDB URI.

You'll paste it into `MONGO_URI` in the backend `.env`. Speaking of which —

## 2. Environment variables

There are two `.env` files — one in `backend/`, one in `frontend/`. There's also a `.env.example` in each folder with all the keys pre-filled (minus the actual secrets, obviously).

**`backend/.env`**

```env
MONGO_URI=mongodb+srv://I_could_have_forgot:To-ReMOvE@that.from.readme.md/?couldHaveGone=prettyBad
JWT_SECRET=make_this_long_and_random_please
PORT=5050
VITE_FRONTEND_URL=http://localhost:5173
```

**`frontend/.env`**

```env
VITE_API_URL=http://localhost:5050/api/
```

> The little separator line in the original `.env.example` marks exactly where backend ends and frontend begins. I thought it was a cute touch. You're welcome.

## 3. Install dependencies

Open two terminals (or split one).

```bash
# terminal 1
cd backend && npm i

# terminal 2
cd frontend && npm i
```

Suspiciously easy. I agree.

## 4. Run the app

If you didn't close those terminals - good job. If you did - not a good job.

```bash
# backend terminal
node ./app.js

# frontend terminal
npm run dev
```

That's it. That's the whole setup.

---

# Architecture

Okay, here's where I pretend to be serious for a moment.

## Project structure

```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/    ← thin layer: reads req, calls service, sends res
│   │   │   ├── auth.controller.js
│   │   │   ├── users.controller.js
│   │   │   └── books.controller.js
│   │   ├── routes/         ← declares endpoints + attaches middleware
│   │   │   ├── auth.routes.js
│   │   │   ├── users.routes.js
│   │   │   └── books.routes.js
│   │   ├── middleware/     ← the bouncers
│   │   │   ├── authenticate.js   ← checks JWT, attaches req.user
│   │   │   └── authorize.js      ← checks role, kicks out common users
│   │   ├── models/         ← Mongoose schemas
│   │   │   ├── User.js
│   │   │   └── Book.js
│   │   ├── services/       ← actual logic lives here
│   │   │   ├── auth.service.js
│   │   │   ├── users.service.js
│   │   │   └── books.service.js
│   │   └── config/
│   │       ├── db.js       ← Mongoose connection
│   │       └── jwt.js      ← token helpers
│   ├── app.js              ← Express setup + global error handler
│   ├── .env
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   └── src/
│       ├── pages/          ← one file per route
│       │   ├── Login.tsx
│       │   ├── Signup.tsx
│       │   ├── Books.tsx
│       │   ├── BookDetail.tsx
│       │   ├── Users.tsx   ← admin only
│       │   └── UserDetail.tsx
│       ├── components/
│       │   ├── BookForm.tsx
│       │   ├── UserForm.tsx
│       │   └── ProtectedRoute.tsx  ← redirects or shows "access denied"
│       ├── context/
│       │   └── AuthContext.tsx  ← stores user + role after login
│       ├── hooks/
│       │   └── useAuth.ts
│       ├── api/
│       │   ├── axios.ts    ← instance with JWT interceptor
│       │   ├── auth.ts
│       │   ├── books.ts
│       │   └── users.ts
│       ├── router/
│       │   └── index.tsx   ← route definitions with role guards
│       └── types/
│           └── index.ts    ← User, Book interfaces
```

## How the layers talk to each other

```
Request
  → route (declares the endpoint)
    → middleware (authenticate → authorize)
      → controller (reads req, sends res)
        → service (does the actual work)
          → model (talks to MongoDB)
```

Controllers are intentionally thin. They don't know what a bcrypt is. They don't care. That's the service's problem.

## Authentication flow

1. User sends `POST /api/auth/login` with email + password.
2. `auth.service` finds the user in DB, compares password with bcrypt.
3. On success, signs a JWT containing `{ id, role }` and returns it.
4. Frontend stores the token in localStorage, attaches it to every request via an axios interceptor.
5. On protected routes, `authenticate` middleware verifies the token and attaches `req.user`. If it's missing or invalid, `401`. If it's there, life goes on.

## Role-based access control

There are two roles: `user` and `admin`. Here's who can do what:

| Action                       | `user` | `admin` |
| ---------------------------- | ------ | ------- |
| View all books               | ✅     | ✅      |
| View one book                | ✅     | ✅      |
| Create / edit / delete books | ❌     | ✅      |
| View all users               | ❌     | ✅      |
| Create / edit / delete users | ❌     | ✅      |

The `authorize` middleware is a factory function. You pass it a role, it gives you a middleware that checks `req.user.role`. So a route looks like this:

```js
router.post('/', authenticate, authorize('admin'), createBook);
```

No role, no entry. The backend enforces this regardless of what the frontend shows or hides — because anyone with a terminal can hit an API.

On the frontend, `AuthContext` stores the logged-in user's role. `ProtectedRoute` uses it to either render the page or redirect. Admins see everything. Common users who manually navigate to `/users` get redirected — their curiosity is appreciated but unproductive.

## Error handling

All errors bubble up to a global error handler in `app.js`. Unhandled promise rejections are caught at the process level so the server doesn't silently die and leave you wondering why nothing works.

---

# API Routes

I am sorry for making it so huge, I didn't mean to.

---

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

yes. again.

| Action                       | User | Admin |
| ---------------------------- | ---- | ----- |
| View books                   | ✅   | ✅    |
| Create / edit / delete books | ❌   | ✅    |
| View users                   | ❌   | ✅    |
| Create / edit / delete users | ❌   | ✅    |

# Interesting facts

1. You may notice `API_test/` — that's a Bruno collection. Bruno is like Postman but open source. I use it because I like the logo. This is a valid engineering decision.
2. I'm mostly a frontend guy. I wrote the entire backend in roughly an hour with very little Express.js experience. Either I'm getting better or the task was well-scoped. Probably both.
