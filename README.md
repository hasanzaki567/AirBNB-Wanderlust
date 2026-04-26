# AirBNB-Wanderlust (Wanderlust)

A full-stack **Airbnb-inspired** listing platform built from scratch (human-written code) to practice real-world backend + frontend integration: authentication, image uploads, interactive maps, and clean MVC-style structure.

## Live Demo
- Deployed on Render: https://hasanzaki-wanderlust-project.onrender.com/

## Repository
- GitHub: https://github.com/hasanzaki567/AirBNB-Wanderlust

---

## Key Features

### Listings (CRUD)
- Create, view, edit, and delete property listings
- Upload listing images (server-side handling + persistence)
- Form validation and user-friendly error feedback

### Image Uploads
- Supports uploading images for listings
- Designed with a production mindset (validation + safe handling)

### Interactive Maps (Leaflet)
- Map UI built with **Leaflet**
- Forward geocoding via **Nominatim (OpenStreetMap)** to turn a place/address into coordinates
- Displays listing locations to improve discovery and UX

### Authentication & Authorization
- User signup/login flow
- Route protection and ownership checks (only owners can edit/delete their content)

---

## What I Learned
This project was the most fun because I learned the *real* way—by building, breaking things, reading errors, and fixing them myself.

- Integrating third-party APIs (maps + geocoding)
- Debugging backend + frontend issues end-to-end
- Designing clean routes/controllers/models (MVC-inspired)
- Deployment lessons on Render and solving environment/runtime issues

> **Note:** This is **not an AI-generated website** — it’s a fully **human-written** project.

---

## Tech Stack (High Level)
- **Node.js / Express.js**
- **MongoDB / Mongoose**
- **EJS** (server-rendered UI)
- **Leaflet + Nominatim** (maps + geocoding)
- Deployed on **Render**

---

## Project Structure (MVC-Inspired)
The codebase is organized to stay readable and scalable:
- **routes/**: endpoints and routing
- **controllers/**: request/business logic
- **models/**: database schemas and data layer
- **views/**: EJS templates
- **middleware/**: auth, validation, error handling helpers

---

## Run Locally
1. Clone the repo
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure environment variables (DB URL, secrets, etc.)
4. Start the server
   ```bash
   npm start
   ```

---

## Feedback
If you have suggestions or improvements, feel free to open an issue or PR.
