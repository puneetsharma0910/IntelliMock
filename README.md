# IntelliMock – AI-Powered Technical Interview Preparation Platform

<<<<<<< HEAD
IntelliMock is a modern, full-stack web application designed to help software engineers prepare for technical interviews. It leverages advanced AI to generate tailored interview questions, detailed answers, and concept explanations, all within a beautiful, responsive UI.
=======

>>>>>>> b7be7a1f14d3c635db228abf104bc88266fe1d12

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

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios, React Hot Toast, Framer Motion, React Markdown, Syntax Highlighting.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer (file upload), Google Gemini AI API.
- **Dev Tools:** ESLint, Nodemon, dotenv.

---

## 📁 Project Structure

```
IntelliMock/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── contexts/      # React context (UserContext)
│   │   ├── pages/         # Page-level components (Landing, Auth, Dashboard, InterviewPrep)
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

## ⚙️ Deployment

### **Frontend (React)**
- Deployed on [Vercel](https://vercel.com/)
- Set environment variable in `client/.env`:
  ```
  VITE_API_BASE_URL=https://<your-backend-app>.onrender.com
  ```
- Build command: `npm run build`
- Output directory: `dist`

### **Backend (Express)**
- Deployed on [Render](https://render.com/)
- Set environment variables in Render dashboard:
  - `PORT`
  - `MONGO_URI`
  - `JWT_SECRET`
  - `GEMINI_API_KEY`
- Start command: `npm start`

---

## 🏃‍♂️ Getting Started Locally

### 1. Clone the Repository

```sh
git clone https://github.com/puneetsharma0910/intellimock.git
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

Create `client/.env`:

```
VITE_API_BASE_URL=http://localhost:8000
```

### 4. Run the Application

```sh
# Start backend
cd server
npm start

# Start frontend
cd ../client
npm run dev
```

---

## 🧑‍💻 Usage Guide

- Register & login to your account.
- Create a new interview session with your target role, experience, and topics.
- Practice with AI-generated questions and answers.
- Pin questions, add notes, and use the "Learn More" feature for instant explanations.
- Manage your sessions and track your progress.

---

## 🔒 Authentication & Security

- All API routes (except auth) are protected by JWT.
- Passwords are hashed using bcrypt.
- Profile images are securely uploaded and served.

---

## 🧠 AI Integration

- Uses [Google Gemini](https://ai.google.dev/) for generating questions and explanations.
- Prompts are crafted for clean, JSON-formatted responses.

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
- Email: puneetsharma0910@example.com

---

**Use IntelliMock to simulate technical interviews, strengthen your fundamentals, and track your progress as you prepare for your dream software engineering role!**
