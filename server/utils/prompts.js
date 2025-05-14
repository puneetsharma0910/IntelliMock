const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (
    `You are a technical interviewer. Generate ${numberOfQuestions} interview questions for a ${role} position with ${experience} years of experience.

Focus on these topics: ${topicsToFocus}

Return ONLY a valid JSON array in this exact format:
[
    {
        "question": "Question text here?",
        "answer": "Detailed answer here"
    }
]

Important:
- Return ONLY the JSON array, no other text
- Each question should be challenging but appropriate for the experience level
- Include a mix of theoretical and practical questions
- Make sure the answers are detailed and include examples where relevant
- DO NOT use code blocks or backticks in the answers
- Write code examples inline without backticks or markdown formatting
- Ensure the JSON is properly formatted with no trailing commas
- Do not include any markdown formatting or code blocks in the response`
)

const conceptExplainPrompt = (question) => (
    `You are a technical interviewer. Provide a detailed explanation for this question:

Question: ${question}

Return ONLY a valid JSON object in this exact format:
{
    "title": "Short title here",
    "explanation": "Detailed explanation here",
    "examples": ["Example 1", "Example 2"],
    "keyPoints": ["Point 1", "Point 2"]
}

Important:
- Return ONLY the JSON object, no other text
- Make the explanation clear and concise
- Include relevant code examples if applicable, but write them inline without backticks
- DO NOT use code blocks or backticks in any part of the response
- Highlight key concepts and best practices
- Ensure the JSON is properly formatted with no trailing commas
- Do not include any markdown formatting or code blocks in the response`
)

module.exports = {
    questionAnswerPrompt,
    conceptExplainPrompt,
}
