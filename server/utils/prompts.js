const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (
    `
    You are an AI trained to generate technical interview questions and answers.

    Task:
    -Role: ${role}
    -Candidate Experience: ${experience} years
    -Focus Topics: ${topicsToFocus}
    -Write ${numberOfQuestions} interview questions.
    -For each question, generate a detailed but beginner-friendly answer.
    -If the answer needs a code example, add a small code block inside.
    -Keep formatting very clean.
    -Return a pure JSON array like:
    [
    {
    "question":"Question here?",
    "answer":"Answer here."
    },
    ...
    ]
    Important: DO NOT add any extra text. Only return valid JSON
      
    `
)

const conceptExplainPrompt = (question) => (
    `
    You are a seasoned interviewer. Your task is to generate a list of ${numberOfQuestions} interview questions for a ${role} role with ${experience} years of experience.

    The questions should be based on the following topics: ${topicsToFocus}.
    Keep formatting very clean.
    If the answer needs a code example, add a small code block inside.
    Return the result as a valid JSON object in the following format:
    {
        "title" : "Short title here?",
        "explanation" : "Explanation here",
    }
    Important:
    - DO NOT add any extra text . Only return valid JSON.
            `

)

module.exports = {
    questionAnswerPrompt,
    conceptExplainPrompt,
}