const Session = require("../models/Session");
const Question = require("../models/Question");

exports.addQuestionToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body

        if(!sessionId || !questions || !Array.isArray(questions) ) {
            return res.status(400).json({ message: "Invalid input data" })
        }

        const session = await Session.findById(sessionId)

        if(!session) return res.status(400).json({ message: "Session not found" })

        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer
            }))
        )

        session.questions.push(...createdQuestions.map((q) => q._id))
        await session.save()

        return res.status(200).json(createdQuestions)
    } catch (error) {
         res.status(500).json({ success: false, message: "Server Error" });
    }
}

exports.togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)

        if(!question) return res.status(400).json({ message: "Question not found" })

        question.isPinned = !question.isPinned
        await question.save()

        return res.status(200).json({ success: true, question })
    } catch (error) {
         res.status(500).json({ success: false, message: "Server Error" });
    }
}

exports.updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body
        const question = await Question.findById(req.params.id)

        if(!question) return res.status(400).json({ message: "Question not found" })

        question.note = note || ""
        await question.save()

        return res.status(200).json({ success: true, question })
    } catch (error) {
         res.status(500).json({ success: false, message: "Server Error" });
    }
}