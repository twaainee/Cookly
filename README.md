# Cookly API

Cookly is a recipe-sharing backend built with Express, MongoDB, and JWT auth.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and set:

   ```bash
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_long_random_secret
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
   ```

3. Start the API:

   ```bash
   npm run dev
   ```

The API runs on `http://localhost:5000` by default.

## Scripts

- `npm run dev`: start the API with nodemon.
- `npm start`: start the API with Node.
- `npm run lint`: run ESLint.
- `npm run check`: syntax-check the server entrypoint.
- `npm test`: run lint and syntax checks.

## API

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Recipes

- `GET /api/recipes`
- `GET /api/recipes/:id`
- `POST /api/recipes`
- `PUT /api/recipes/:id`
- `DELETE /api/recipes/:id`

Protected routes require:

```http
Authorization: Bearer <token>
```
