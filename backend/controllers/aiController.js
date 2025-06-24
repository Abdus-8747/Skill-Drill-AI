const { GoogleGenerativeAI } = require("@google/generative-ai");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const result = await model.generateContent(prompt);
    const response = result.response;

    //console.log("Raw Gemini response:", JSON.stringify(response, null, 2)); // log for debugging

    const text = response.candidates[0].content.parts[0].text;

    const cleanedText = text
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    console.log(cleanedText);
    
    const data = JSON.parse(cleanedText);

    return res.status(200).json(data);
  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};



const generateConceptExplanations = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate explanations",
      error: error.message,
    });
  }
};



module.exports = { generateInterviewQuestions, generateConceptExplanations }