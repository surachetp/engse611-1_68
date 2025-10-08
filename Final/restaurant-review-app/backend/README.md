# Restaurant Review Backend

This is a small Express backend that serves restaurant data and stores reviews in JSON files. It's intended for the `Final/restaurant-review-app` project.

Run locally:

1. Install dependencies:

   npm install

2. Start in development (with auto-reload):

   npm run dev

3. Start production:

   npm start

API Endpoints:

- GET /api/restaurants
- GET /api/restaurants/:id
- GET /api/reviews[?restaurantId=]
- POST /api/reviews

Notes:

- Data is persisted to `backend/data/*.json`. This is a simple JSON store for demo purposes only.
- CORS is enabled to allow a separate frontend dev server.
