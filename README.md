# IntelliMock - Interview Preparation Platform

IntelliMock is a professional-grade interview preparation platform designed to help software engineers prepare for top tech companies like Google, Microsoft, and other FAANG+ companies. Our platform provides a comprehensive suite of tools to master technical interviews through AI-powered mock interviews, real-time feedback, and industry-standard evaluation criteria.

## Features

### Technical Interview Preparation
- 🤖 AI-powered interview questions aligned with Google and Microsoft SDE standards
- 📝 Real-time coding environment with syntax highlighting
- 🔍 Detailed explanations and optimal solutions
- 📊 Performance analytics and improvement tracking
- 🎯 Topic-wise preparation modules (DSA, System Design, OOP)

### System Design & Architecture
- 🏗️ System design interview preparation
- 📐 Architecture diagram generation
- 🔄 Scalability and performance optimization scenarios
- 🗄️ Database design and optimization
- 🔒 Security and authentication patterns

### Behavioral & Leadership
- 👥 Leadership principles alignment
- 📈 Project management scenarios
- 🤝 Team collaboration exercises
- 🎯 Goal-setting and execution planning
- 📝 STAR method response evaluation

### Enterprise Features
- 👤 Enterprise-grade authentication and security
- 📊 Advanced analytics and progress tracking
- 🔄 Real-time collaboration features
- 📱 Responsive design for all devices
- 🔒 Data privacy and security compliance

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for enterprise-grade UI
- Redux Toolkit for state management
- React Router for navigation
- Jest and React Testing Library for testing
- ESLint and Prettier for code quality

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Redis for caching
- JWT Authentication with refresh tokens
- Google's Generative AI API
- AWS S3 for file storage
- Docker for containerization

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Google Cloud API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/intellimock.git
cd intellimock
```

2. Install dependencies for both client and server:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
GOOGLE_API_KEY=your_google_api_key
```

4. Create a `.env` file in the client directory:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000
```

## Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
intellimock/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── public/            # Static files
│
└── server/                # Backend Node.js application
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middlewares/      # Custom middlewares
    ├── models/          # MongoDB models
    ├── routes/          # API routes
    ├── services/        # Business logic
    ├── utils/           # Utility functions
    └── uploads/         # Uploaded files directory
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Interview Sessions
- `POST /api/sessions/create` - Create a new interview session
- `GET /api/sessions/my-sessions` - Get user's interview sessions
- `GET /api/sessions/:id` - Get specific session details
- `PUT /api/sessions/:id` - Update session progress
- `DELETE /api/sessions/:id` - Delete a session

### AI Features
- `POST /api/ai/generate-questions` - Generate interview questions
- `POST /api/ai/generate-explanation` - Generate answer explanations
- `POST /api/ai/evaluate-answer` - Evaluate user's answer
- `POST /api/ai/generate-system-design` - Generate system design scenarios

### Analytics
- `GET /api/analytics/performance` - Get user performance metrics
- `GET /api/analytics/strengths` - Get user's strong areas
- `GET /api/analytics/weaknesses` - Get areas for improvement

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Code Quality Standards

- All code must pass ESLint and Prettier checks
- Unit tests required for new features
- TypeScript strict mode enabled
- Documentation required for new APIs
- Performance benchmarks for critical features
