const { GoogleGenerativeAI } = require("@google/generative-ai");
const {conceptExplainPrompt, questionAnswerPrompt} = require("../utils/prompts");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//@DESC GENERATE interview questions and answers using gemini
//@route POST /api/ai/generate-questions
//@access Private

const generateInterviewQuestions = async (req, res) => {
    try{
        const {role, experience, topicsToFocus, numberOfQuestions} = req.body;
        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message: "All fields are required"});
        }
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        const response = await ai.generateContent({
            model : "gemini-2.0-flash-lite",
            contents : prompt,
        });
        let rawText = response.text;
        //clean it : remove ```json and ``` from the beginning and end
        const cleanText = rawText.replace(/^```json\s*/,"")
        .replace(/```$/,"")
        .trim();
        //parse it as json
        const data = JSON.parse(cleanText);
       
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error:error.message, message: "Failed to generate interview questions"});
    }
}

//@desc Generate concept explanation using gemini
//@route POST /api/ai/generate-explanation
//@access Private

const generateConceptExplanation = async (req, res) => {
    try{
        const {question} = req.body;
        if(!question){
            return res.status(400).json({message: "Question is required"});
        }
        const prompt = conceptExplainPrompt(question);
        const response = await ai.models.generateContent({
            model : "gemini-2.0-flash-lite",
            contents : prompt,
        });
        let rawText = response.text();
        //clean it : remove ```json and ``` from the beginning and end
        const cleanedText = rawText.replace(/^```json\s*/,"")
        .replace(/```$/,"")
        .trim();
        //parse it as json
        const data = JSON.parse(cleanedText);
        res.status(200).json(data);

    }catch(error){
        res.status(500).json({error:error.message, message: "Failed to generate concept explanation"});
    }
}


module.exports = {
    generateInterviewQuestions,
    generateConceptExplanation,
}
