import { useContext, useState, useEffect } from 'react'

import { QuizContext } from '../context/QuizContext'
import QuizItem from './QuizItem'

import './Quiz.css'

const Quiz = () => {
    const [quizState, setQuizState] = useContext(QuizContext)

    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])

    const submitQuestion = (answer) => {
        if(answer === questions[currentQuestion].correct_answer) {
            setQuizState({...quizState, points: quizState.points + 1})
        }

        setCurrentQuestion(currentQuestion + 1)
    }

    useEffect(() => {
        const getQuestions = async url => {
            const response = await fetch(url);
            const data = await response.json();
    
            setQuestions(data.results)
        }
        
        getQuestions(quizState.questionsURL)
    }, [quizState.questionsURL])

    useEffect(() => {
        const generateAnswers = () => {
            if(questions.length > 0 && questions.length > currentQuestion) {
        
                let data = [...questions[currentQuestion].incorrect_answers]
                
                const randomIndex = Math.floor(Math.random() * 3)
        
                data.splice(randomIndex, 0, questions[currentQuestion].correct_answer)
        
                setAnswers(data)
            }
        }

        generateAnswers()
    }, [questions, currentQuestion])

    return (
        <div className="quiz-container">
            {questions.length > 0 && <>
                <h1>Your points: {quizState.points}</h1>

                {currentQuestion < questions.length ? <>
                    <p className="current-question"> Question: {currentQuestion + 1}</p>
                    <h1>{questions[currentQuestion].question}</h1>
                    <div className="quiz-answers">
                        {answers.length > 0 && answers.map(answer =>
                            <QuizItem
                                key={answer}
                                answer={answer}
                                submitFunction={() => submitQuestion(answer)}
                            />
                        )}
                    </div>
                </> : <>
                    <button className="quiz-button" type="submit" onClick={() => setQuizState({...quizState, state: 'menu'})}>Main Menu</button>
                </>}
            </>}
            
        </div>
    )
}

export default Quiz
