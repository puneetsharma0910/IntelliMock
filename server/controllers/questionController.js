const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc Add questions to a session existing session
// @route POST /api/questions/add
// @access Private

// exports.addQuestionsToSession = async (req, res) => {
//     try{
//         const {sessionId, questions} = req.body;
//         if(!sessionId || !questions || !Array.isArray(questions)) {
//             return res.status(400).json({message: "Invalid inout data"});
//         }
//         const session = await Session.findById(sessionId);
//         if(!session) {
//             return res.status(404).json({message: "Session not found"});
            
//         }
//         //create new questions
//         const createdQuestions = await Question.insertMany(questions.map((q)=>({
//             question: q.question,
//             answer: q.answer,
//             session: sessionId,

//         })));
//         //update session with new questions
//         session.questions.push(...createdQuestions.map((q)=>q._id));
//         await session.save();
//           //update session with new questions
//         session.questions.push(...createdQuestions.map((q)=>q._id));
//         await session.save();

//         // Fetch updated session with populated questions
//         const updatedSession = await Session.findById(sessionId).populate({
//             path: "questions",
//             options: { sort: { isPinned: -1, createdAt: 1 } }
//         });

//         res.status(201).json({ session: updatedSession });
// // ...existing code...
//         res.status(201).json(createdQuestions);
        
//     }
//     catch(error) {
//         console.error("Error adding questions to session:", error);
//         return res.status(500).json({message: "Internal server error"});
//     }
   
// }

exports.addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;
        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: "Invalid input data" });
        }
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        // create new questions
        const createdQuestions = await Question.insertMany(questions.map((q) => ({
            question: q.question,
            answer: q.answer,
            session: sessionId,
        })));
        // update session with new questions (only once)
        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        // Fetch updated session with populated questions
        const updatedSession = await Session.findById(sessionId).populate({
            path: "questions",
            options: { sort: { isPinned: -1, createdAt: 1 } }
        });

        return res.status(201).json({ session: updatedSession });
    } catch (error) {
        console.error("Error adding questions to session:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
// @desc Toggle pin question
// @route POST /api/questions/:id/pin
// @access Private

exports.togglePinQuestion = async (req, res) => {
    try{
        const question = await Question.findById(req.params.id);
        if(!question) {
            return res.status(404).json({message: "Question not found"});
        }
        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({success:true, question});
    }catch(error){
      
        return res.status(500).json({message: "Internal server error"});
    }

}

// @desc Update question note
// @route POST /api/questions/:id/note
// @access Private

exports.updateQuestionNote = async (req, res) => {
    try{
        const {note} = req.body;
        const question = await Question.findById(req.params.id);
        if(!question) {
            return res.status(404).json({success: false, message: "Question not found"});
        }
        question.note = note || "";
        await question.save();
        res.status(200).json({success: true, question});
    }
    catch(error) {
        console.error("Error updating question note:", error);
        return res.status(500).json({success: false, message: "Internal server error"});
        
    }
}
