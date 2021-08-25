import './QuizItem.css'

const QuizItem = ({answer, submitFunction}) => {
    return (
        <div className="quiz-item" onClick={submitFunction}>
            <h1>{answer}</h1>
        </div>
    )
}

export default QuizItem
