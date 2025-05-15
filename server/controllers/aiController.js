const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//@DESC GENERATE interview questions and answers using gemini
//@route POST /api/ai/generate-questions
//@access Private
const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
        
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        const response = await model.generateContent(prompt);
        const result = response.response;
        
        console.log("Raw Gemini response:", result.text());
        
        let rawText = result.text();
        
        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();
            
        console.log("Cleaned text before parsing:", cleanedText);
        
        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            return res.status(500).json({ 
                message: "Failed to parse AI response as JSON",
                rawResponse: cleanedText
            });
        }
        
        console.log("Successfully parsed data:", data);
        res.status(200).json(data);
    } catch (error) {
        console.error("Generate questions error:", error);
        res.status(500).json({ 
            error: error.message, 
            message: "Failed to generate interview questions"
        });
    }
}

//@desc Generate concept explanation using gemini
//@route POST /api/ai/generate-explanation
//@access Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing 'question' field" });
    }

    const prompt = conceptExplainPrompt(question);

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const response = await model.generateContent(prompt);
    const result = response.response;

    let rawText = result.text();

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return res.status(500).json({
        message: "Failed to parse AI response as JSON",
        rawResponse: cleanedText,
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Generate explanation error:", error);
    res.status(500).json({
      error: error.message,
      message: "Failed to generate concept explanation",
    });
  }
};


module.exports = {
    generateInterviewQuestions,
    generateConceptExplanation,
}

















// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

// const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// //@DESC GENERATE interview questions and answers using gemini
// //@route POST /api/ai/generate-questions
// //@access Private
// const generateInterviewQuestions = async (req, res) => {
//     try {
//         const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
        
//         if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
        
//         const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        
//         // Use the correct method based on Gemini API
//         const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
//         const response = await model.generateContent(prompt);
//         const result = response.response;
        
//         console.log("Raw Gemini response:", result.text());
        
//         let rawText = result.text();
        
//         // Clean it: remove ```json and ``` from the beginning and end
//         const cleanedText = rawText
//             .replace(/^```json\s*/, "")
//             .replace(/```$/, "")
//             .trim();
            
//         console.log("Cleaned text before parsing:", cleanedText);
        
//         // Parse it as JSON with error handling
//         let data;
//         try {
//             data = JSON.parse(cleanedText);
//         } catch (parseError) {
//             console.error("JSON parse error:", parseError);
//             return res.status(500).json({ 
//                 message: "Failed to parse AI response as JSON",
//                 rawResponse: cleanedText
//             });
//         }
        
//         console.log("Successfully parsed data:", data);
//         res.status(200).json(data);
//     } catch (error) {
//         console.error("Generate questions error:", error);
//         res.status(500).json({ 
//             error: error.message, 
//             message: "Failed to generate interview questions"
//         });
//     }
// }

// //@desc Generate concept explanation using gemini
// //@route POST /api/ai/generate-explanation
// //@access Private
// const generateConceptExplanation = async (req, res) => {
//     try {
//         const { question } = req.body;
        
//         if (!question) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }
        
//         const prompt = conceptExplainPrompt(question);
        
//         // Use the correct method based on Gemini API
//         const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
//         const response = await model.generateContent(prompt);
//         const result = response.response;
        
//         console.log("Raw Gemini response:", result.text());
        
//         let rawText = result.text();
        
//         // Clean it: remove ```json and ``` from the beginning and end
//         const cleanedText = rawText
//             .replace(/^```json\s*/, "")
//             .replace(/```$/, "")
//             .trim();
            
//         console.log("Cleaned text before parsing:", cleanedText);
        
//         // Parse it as JSON with error handling
//         let data;
//         try {
//             data = JSON.parse(cleanedText);
//         } catch (parseError) {
//             console.error("JSON parse error:", parseError);
//             return res.status(500).json({ 
//                 message: "Failed to parse AI response as JSON",
//                 rawResponse: cleanedText
//             });
//         }
        
//         console.log("Successfully parsed data:", data);
//         res.status(200).json(data);
//     } catch (error) {
//         console.error("Generate explanation error:", error);
//         res.status(500).json({ 
//             error: error.message, 
//             message: "Failed to generate concept explanation" 
//         });
//     }
// }

// module.exports = {
//     generateInterviewQuestions,
//     generateConceptExplanation,
// }