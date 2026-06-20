# Matrix Industries – SSC Assessment Submission

This repository contains my submission for the SSC Website Developer (Full Stack) take-home assessment.

The objective was to build a value generation page for Matrix Industries using their existing design language while implementing the required backend API for the contact form.



---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide React (icons)

### Backend

- Node.js
- Express
- express-validator
- express-rate-limit

### Data Storage

Contact form submissions are stored in a local JSON file (`submissions.json`) since a database wasn't required for this assessment.

---

## Project Structure

```
.
├── frontend/
│   ├── app/
│   │   └── components/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   └── package.json
│
└── README.md
```

> Note: `submissions.json` is generated automatically by the backend at runtime and is excluded from version control via `.gitignore`.

---

## Requirements

- Node.js 18 or newer
- npm 9 or newer

---

## Running the Project

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Start the backend

```bash
cd backend
npm install
npm run start
```

The backend runs on:

```
http://localhost:4000
```

### 3. Start the frontend

Open another terminal.

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```
http://localhost:3000
```

Both applications need to be running for the contact form to work correctly.

---

## Environment Variables

No environment variables are required for local development.

The application uses the following default ports:

| Service | Port |
|---------|------|
| Frontend | 3000 |
| Backend | 4000 |

If deploying the application, the backend can optionally use:

| Variable | Description |
|----------|-------------|
| FRONTEND_URL | Used to configure the allowed CORS origin |

---

## Contact API

### POST `/api/contact`

Accepts contact form submissions.

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "07123456789",
  "message": "We'd like to discuss your services."
}
```

### Validation

The backend validates:

- Name (required)
- Email (required, valid format)
- Phone number (required, valid format)
- Message (required, minimum length)

Invalid requests return a `422` response with a descriptive validation error.

### Spam Protection

Basic rate limiting has been implemented using `express-rate-limit`, capping submissions per IP address within a fixed time window. Requests over the limit return a `429` response.

### Storage

Successful submissions are appended to `backend/submissions.json` together with a generated ID and timestamp.

---

## Engineering Decisions

A few implementation choices I made while building this project:

- Kept each page section as its own reusable React component.
- Used TypeScript on the frontend for better type safety.
- Used the native `IntersectionObserver` API for scroll animations instead of adding an animation library, since the required interaction is lightweight and didn't justify a new dependency.
- Performed validation on the server rather than relying only on client-side validation.
- Used file-based storage because the assessment only requires submissions to be stored and doesn't require a database.
- Kept the backend intentionally simple and unopinionated (plain Express, no framework scaffolding) to make it easy to follow during code review.

---

## Design Notes

The page follows the visual style of the existing Matrix Industries website rather than introducing a new design language.

The required sections from the assessment have been implemented:

- Hero Banner
- Services
- Value Generation Framework
- Client Testimonials
- Contact Form

The testimonials are original placeholder content created specifically for this assessment, as the public website doesn't publish customer testimonials.

The company logo is sourced from the public Matrix Industries website. The remaining content and implementation are original.

---

## Future Improvements

If this were being developed beyond the scope of the assessment, I would consider:

- Replacing JSON storage with PostgreSQL or MongoDB
- Adding CAPTCHA alongside rate limiting
- Writing automated tests for the contact API
- Using environment-based configuration for API URLs
- Adding structured logging and request monitoring

---

## Known Limitations

To keep the implementation aligned with the assessment scope:

- Contact submissions are stored in a local JSON file rather than a database.
- Authentication has not been implemented.
- The project is intended as a demonstration rather than a production deployment.

---

## Closing Notes

Thank you for taking the time to review my submission.

I approached this assessment with the same priorities I would use on a production project: clean component structure, maintainable code, responsive design, server-side validation, and straightforward architecture.

I'm looking forward to walking through the implementation and discussing any design or technical decisions during the interview.