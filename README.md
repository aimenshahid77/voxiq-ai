# Voxiq, AI Interview Preparation Platform

Voxiq is a full-stack AI-powered interview preparation web application. It helps users practice for job interviews through AI chat preparation and live mock voice interviews with real-time transcription and performance evaluation.

**Live Demo:** [https://voxiq-ai.vercel.app](https://voxiq-ai.vercel.app)

---

## Features

- **Authentication** — Email/password registration and login with JWT tokens. Social login via Google, GitHub, and LinkedIn using OAuth 2.0.
- **Onboarding** — Profile setup with current role, experience level, bio, and resume upload (stored on Cloudflare R2).
- **AI Chat Preparation** — Create interviews by pasting a job description. Chat with an AI (powered by Groq) to prepare for the role with personalized questions and answers.
- **Mock Voice Interviews** — Start a live AI voice interview session powered by VAPI. The AI interviewer asks real questions based on your resume and job description.
- **Real-time Transcription** — See the conversation transcript appear in real time as you speak during mock interviews.
- **AI Evaluation** — After each mock session, receive a detailed scorecard with overall score, metrics breakdown (technical competence, communication skills, problem solving), strengths, areas for improvement, and detailed feedback.
- **Session History** — View all past mock interview sessions with full transcripts and evaluations.
- **Profile Management** — Edit profile details and upload a new resume at any time.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | Core framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Shadcn/ui | UI components |
| React Router v6 | Client-side routing |
| TanStack React Query | Server state management and caching |
| Zustand | Global client state (auth) |
| React Hook Form + Zod | Form handling and validation |
| Axios | HTTP client with JWT interceptors |
| VAPI Web SDK | Voice interview integration |
| Sonner | Toast notifications |

### Backend
Built with Django + Django REST Framework. Repository: [voxiq-ai backend](https://github.com/moin-ul-haq/voxiq-ai)

| Technology | Purpose |
|---|---|
| Django 6 | Backend framework |
| Django REST Framework | REST API |
| Simple JWT | JWT authentication |
| Groq | AI chat responses |
| VAPI | Voice AI interviews |
| Cloudflare R2 | Resume file storage |
| PostgreSQL | Production database |

---

## Project Structure

```
src/
├── components/
│   ├── auth/           # Login, Register, Social login buttons
│   ├── chat/           # Chat view, messages, input, mock interview modal, history
│   ├── dashboard/      # Dashboard layout, profile view, interviews view
│   ├── onboarding/     # Onboarding form
│   └── ui/             # Shadcn primitives
├── hooks/
│   ├── useAuth.ts      # React Query hooks for auth operations
│   └── useInterviews.ts # React Query hooks for interviews and chat
├── pages/              # Route-level page components
├── services/
│   ├── api.ts          # Axios instance with JWT interceptors + auto token refresh
│   ├── auth.ts         # Auth API functions
│   └── interviews.ts   # Interview and voice API functions
├── store/
│   └── authStore.ts    # Zustand store for authenticated user state
└── types/
    └── index.ts        # TypeScript interfaces
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Backend server running (see backend repo)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/voxiq-frontend.git
cd voxiq-frontend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://127.0.0.1:8000
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key
```

### Run Development Server

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## User Flow

```
Landing Page
    ↓
Register (email/password or social login)
    ↓
Onboarding (role, experience, bio, resume upload)
    ↓
Dashboard — Profile View
    ↓
Interviews Tab → Create New Interview (job title + description)
    ↓
Chat Page — AI preparation chat
    ↓
Mock Interview → Live voice session with AI
    ↓
Session ends → Real-time transcript saved
    ↓
History → View transcript + AI evaluation scorecard
```

---

## Key Technical Decisions

- **JWT with auto-refresh** — `api.ts` intercepts every 401 response, automatically refreshes the access token using the refresh token, and retries the original request. Users never get logged out unexpectedly.
- **Zustand + React Query** — React Query handles all server state (interviews, chat, sessions). Zustand handles the authenticated user object. They work together — after login, user is saved to both.
- **Optimistic UI in chat** — Messages appear instantly in the UI before the API confirms, giving a smooth chat experience. If the request fails, the message is rolled back.
- **Component separation** — Chat feature is split into `ChatView`, `ChatMessages`, `ChatInput`, `MockInterviewModal`, `SessionHistoryModal`, and `EvaluationView` for maintainability.
- **Zod + React Hook Form** — All forms validate on the frontend before hitting the API, with error messages shown inline under each field.

---

## Deployment

- **Frontend** — Deployed on Vercel with automatic deployments on every push to `main`
- **Backend** — Deployed on Render at `https://voxiq-ai.onrender.com`

---

## Environment Variables (Production)

Set these in Vercel dashboard under Settings → Environment Variables:

```
VITE_API_URL=https://voxiq-ai.onrender.com
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key
```

---

## Contributing

This is a semester project. Pull requests are not open at this time.

---

## License

MIT
