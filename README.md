# MERN Portfolio — Full Stack Developer

A full-stack personal portfolio built with the **MERN stack** (MongoDB, Express, React, Node.js).

## Project Structure

```
mern-portfolio/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx
│       │   ├── Experience.jsx
│       │   └── Contact.jsx   ← MongoDB contact form
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
└── server/          # Node.js + Express backend
    ├── models/
    │   └── Contact.js        ← Mongoose schema
    ├── routes/
    │   └── contact.js        ← POST /api/contact
    ├── server.js
    └── .env.example
```

## Quick Start

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI + SMTP settings
npm run dev
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 3. Open

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/health

---

## MongoDB Setup (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get the connection string
4. Paste it as `MONGO_URI` in `server/.env`
5. Use the exact Atlas host (for example `cluster0.<atlas-cluster-id>.mongodb.net`) and URL-encode special chars in password (`@` -> `%40`)

---

## API Endpoints

| Method | Route        | Description              |
| ------ | ------------ | ------------------------ |
| POST   | /api/contact | Save a contact message   |
| GET    | /api/contact | Get all messages (admin) |
| GET    | /api/health  | Health check             |

## Contact Notifications (Email)

When someone submits the contact form:

1. Message is saved to MongoDB
2. Notification email is sent to `NOTIFY_EMAIL` via SMTP

Configure these in `server/.env`:

- `SMTP_HOST` (example: `smtp.gmail.com`)
- `SMTP_PORT` (`465` for SSL, `587` for TLS)
- `SMTP_SECURE` (`true` with port 465, otherwise `false`)
- `SMTP_USER`
- `SMTP_PASS` (for Gmail use App Password, not normal password)
- `EMAIL_FROM`
- `NOTIFY_EMAIL`

---

## Personalization Checklist

- [ ] Replace `Your Name` in `Hero.jsx`, `App.jsx`, footer
- [ ] Update email in `Contact.jsx`
- [ ] Update project details in `Projects.jsx`
- [ ] Update experience/education in `Experience.jsx`
- [ ] Update skill tags in `Skills.jsx`
- [ ] Add real GitHub/LinkedIn URLs
- [ ] Set your `MONGO_URI` in `server/.env`

## Deploy

- **Frontend**: Vercel — `cd client && vercel`
- **Backend**: Render / Railway — connect `server/` folder
- Set `VITE_API_URL` in Vercel env to your Render backend URL
