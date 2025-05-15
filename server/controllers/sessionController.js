const Session = require("../models/Session");
const Question = require("../models/Question");

//@desc Create a new session and linked questions
//@route POST /api/sessions/create
//@access Private

exports.createSession = async (req, res) => {
    try{
        const {role, experience, topicsToFocus, description, questions } = req.body;
        
        const userId = req.user.id;
        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        });

       
            const questionsDocs = await Promise.all(questions.map(async (q) => {
                const question = await Question.create({
                    question: q.question,
                    session: session._id,
                    answer: q.answer,
                });
                return question._id;
            }));
            session.questions = questionsDocs;
            await session.save();
        

        res.status(201).json({session, success: true});
        
    }
    catch(error) {
        console.error("Error creating session:", error);
        res.status(500).json({message: "Internal server error", success: false, error: error.message});
    }
};

//@desc Get all sessions for a loged in user
//@route GET /api/sessions/my-sessions
//@access Private

exports.getMySessions = async (req, res) => {
    try{
        const sessions = await Session.find({user: req.user.id})
        .sort({createdAt: -1})
        .populate("questions");
        res.status(200).json(sessions);

    }catch(error) {
        res.status(500).json({message: "Internal server error", success: false});
    }
};

//@desc Get a session by id
//@route GET /api/sessions/:id
//@access Private

exports.getSessionById = async (req, res) => {
    try{
        const session = await Session.findById(req.params.id)
        .populate({
            path: "questions",
            options: {sort: {isPinned: -1, createdAt:1}},
        })
        .exec();
        if(!session) {
            return res.status(404).json({message: "Session not found", success: false});
        }
        res.status(200).json({session, success: true});
    }
    catch(error) {
        res.status(500).json({message: "Internal server error", success: false});
    }
};

//@desc Delete a session by id
//@route DELETE /api/sessions/:id
//@access Private

exports.deleteSession = async (req, res) => {
    try{
        const session = await Session.findById(req.params.id);
        if(!session) {
            return res.status(404).json({message: "Session not found"});
        }
        if(session.user.toString() !== req.user.id) {
            return res.status(401).json({message: "Unauthorized"});
        }
        await Question.deleteMany({session: session._id});
        await session.deleteOne();
        res.status(200).json({message: "Session deleted successfully"});
    }
    catch(error) {
        res.status(500).json({message: " server error", success: false});
    }
};




