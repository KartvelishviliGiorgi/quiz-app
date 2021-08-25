import { useState, createContext } from "react"

const QuizContext = createContext()

const QuizProvider = props => {
    const [quizState, setQuizState] = useState({
        state: 'menu',
        questionsURL: '',
        points: 0
    })

    return (
        <QuizContext.Provider value={[quizState, setQuizState]}>
            {props.children}
        </QuizContext.Provider>
    )
}

export { QuizContext, QuizProvider }
