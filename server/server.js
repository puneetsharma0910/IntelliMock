require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const {generateInterviewQuestions, generateConceptExplanation} = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");


const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

connectDB();
//routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);

app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);




app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));
 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });







