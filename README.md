# IntelliMock – AI-Powered Interview Preparation Platform

IntelliMock is a professional-grade platform designed to help you **crack Microsoft SDE (entry-level)** and other top tech interviews. It leverages AI to generate technical interview questions, detailed answers, and concept explanations, simulating real interview scenarios with analytics and session management.

---

## 🚀 Features

### AI Interview Practice
- **AI-generated technical questions** tailored to your role, experience, and focus topics (DSA, System Design, OOP, etc.).
- **Detailed, beginner-friendly answers** with code examples and clean formatting.
- **Concept explanations**: Instantly get clear, concise explanations for any technical concept.

### Session Management
- **Create and manage interview sessions**: Save, revisit, and organize your practice sessions.
- **Pin important questions** and add personal notes for revision.
- **Track your progress** with session history and analytics.

### User Experience
- **Modern, responsive UI** built with React and Tailwind CSS.
- **Profile management** with image upload.
- **Secure authentication** using JWT.
- **Real-time feedback** and error handling.

---

## 🏗️ Tech Stack

- **Frontend**: React, Tailwind CSS, Vite, React Router, Axios, React Hot Toast, Framer Motion, React Markdown, Syntax Highlighting.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Multer (file upload), Google Gemini AI API.
- **Dev Tools**: ESLint, Nodemon, dotenv.

---

## 📁 Project Structure

```
IntelliMock/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # UI components (cards, loaders, layouts, inputs)
│   │   ├── contexts/      # React context (UserContext)
│   │   ├── pages/         # Page-level components (Landing, Auth, Dashboard, InterviewPrep)
│   │   │   ├── utils/     # API paths, helpers, axios instance, data
│   │   └── main.jsx       # App entry point
│   ├── public/            # Static assets
│   └── vite.config.js     # Vite config
│
├── server/                # Node.js backend
│   ├── config/            # DB connection
│   ├── controllers/       # Route controllers (auth, ai, session, question)
│   ├── middlewares/       # Auth & upload middlewares
│   ├── models/            # Mongoose models (User, Session, Question)
│   ├── routes/            # Express routers
│   ├── utils/             # AI prompt templates
│   ├── uploads/           # Uploaded images
│   ├── .env               # Environment variables
│   └── server.js          # App entry point
│
└── README.md              # This file
```

---

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js** (v16+)
- **MongoDB Atlas** (or local MongoDB)
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/intellimock.git
cd intellimock
```

### 2. Install Dependencies

```sh
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Configure Environment Variables

Create `server/.env`:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

> **Note:** Never commit your `.env` file to version control.

---

## 🏃‍♂️ Running the Application

### 1. Start the Backend

```sh
cd server
npm run dev
# or
npm start
```

### 2. Start the Frontend

```sh
cd client
npm run dev
```

- **Frontend:** http://localhost:5173 (default Vite port)
- **Backend API:** http://localhost:8000

---

## 🧑‍💻 Usage Guide

### 1. Register & Login

- Sign up with your name, email, password, and (optionally) a profile image.
- Log in to access your dashboard.

### 2. Create a New Interview Session

- Click **Add New** on the dashboard.
- Enter your target role (e.g., "Software Engineer"), years of experience, and topics to focus on (e.g., "DSA, System Design, OOP").
- The AI will generate 10 tailored questions and answers.

### 3. Practice & Learn

- Expand questions to view detailed answers (with code).
- Pin important questions or add notes.
- Click **Learn More** for instant AI-powered concept explanations.

### 4. Manage Sessions

- View all your sessions on the dashboard.
- Delete sessions you no longer need.

---

## 🔒 Authentication & Security

- All API routes (except auth) are protected by JWT.
- Passwords are hashed using bcrypt.
- Profile images are securely uploaded and served.

---

## 🧠 AI Integration

- Uses [Google Gemini](https://ai.google.dev/) for generating questions and explanations.
- Prompts are carefully crafted for clean, JSON-formatted responses.

---

## 🛠️ API Endpoints

### Auth
- `POST /api/auth/register` – Register
- `POST /api/auth/login` – Login
- `GET /api/auth/profile` – Get user profile
- `POST /api/auth/upload-image` – Upload profile image

### Sessions
- `POST /api/sessions/create` – Create session
- `GET /api/sessions/my-sessions` – List your sessions
- `GET /api/sessions/:id` – Get session details
- `DELETE /api/sessions/:id` – Delete session

### Questions
- `POST /api/questions/add` – Add questions to session
- `POST /api/questions/:id/pin` – Pin/unpin question
- `POST /api/questions/:id/note` – Add/update note

### AI
- `POST /api/ai/generate-questions` – Generate interview questions (AI)
- `POST /api/ai/generate-explanation` – Generate concept explanation (AI)

---

## 📝 Code Quality

- **ESLint** for code linting.
- **React best practices**: hooks, context, modular components.
- **Error handling**: User-friendly messages and robust backend error responses.
- **Responsive UI**: Works on all devices.

---


## 🤝 Contributing

1. Fork this repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 🙋‍♂️ Need Help?

- Open an issue on GitHub
- Email: your.email@example.com
*