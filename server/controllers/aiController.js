const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const {conceptExplainPrompt, questionAnswerPrompt} = require("../utils/prompts");

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//@DESC GENERATE interview questions and answers using gemini
//@route POST /api/ai/generate-questions
//@access Private

const generateInterviewQuestions = async (req, res) => {
    try{
        const {role, experience, topicsToFocus, numberOfQuestions} = req.body;
        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message: "All fields are required"});
        }

        // Get the model
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash",
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ],
        });

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        
        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        //clean it : remove ```json and ``` from the beginning and end
        const cleanText = text.replace(/^```json\s*/,"")
        .replace(/```$/,"")
        .trim();
        
        try {
            //parse it as json
            const data = JSON.parse(cleanText);
            
            // Validate the data structure
            if (!Array.isArray(data)) {
                throw new Error("Response is not an array");
            }
            
            // Validate each question object
            data.forEach((item, index) => {
                if (!item.question || !item.answer) {
                    throw new Error(`Invalid question object at index ${index}`);
                }
            });
            
            res.status(200).json(data);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.error("Raw response:", cleanText);
            res.status(500).json({
                error: parseError.message,
                message: "Failed to parse AI response",
                rawResponse: cleanText
            });
        }
    }catch(error){
        console.error("Error generating questions:", error);
        res.status(500).json({
            error: error.message, 
            message: "Failed to generate interview questions",
            details: error.stack
        });
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

        // Get the model
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash",
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ],
        });

        const prompt = conceptExplainPrompt(question);
        
        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        //clean it : remove ```json and ``` from the beginning and end
        const cleanedText = text.replace(/^```json\s*/,"")
        .replace(/```$/,"")
        .trim();
        
        try {
            //parse it as json
            const data = JSON.parse(cleanedText);
            
            // Validate the data structure
            if (!data.title || !data.explanation || !Array.isArray(data.examples) || !Array.isArray(data.keyPoints)) {
                throw new Error("Invalid response structure");
            }
            
            res.status(200).json(data);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.error("Raw response:", cleanedText);
            res.status(500).json({
                error: parseError.message,
                message: "Failed to parse AI response",
                rawResponse: cleanedText
            });
        }
    }catch(error){
        console.error("Error generating explanation:", error);
        res.status(500).json({
            error: error.message, 
            message: "Failed to generate concept explanation",
            details: error.stack
        });
    }
}

module.exports = {
    generateInterviewQuestions,
    generateConceptExplanation,
}
