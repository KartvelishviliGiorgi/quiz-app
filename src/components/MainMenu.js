import { useState, useEffect, useContext } from 'react'

import { QuizContext } from '../context/QuizContext'

import './MainMenu.css'

const MainMenu = () => {
    const [quizState, setQuizState] = useContext(QuizContext)

    const [categories, setCategories] = useState([])

    const submitHandler = e => {
        e.preventDefault()

        const {questions, difficulty, category} = e.target
        
        let questionsNumber = parseInt(questions.value)

        if(isNaN(questionsNumber) || questionsNumber < 5 || questionsNumber > 50) {
            questionsNumber = 5
        }

        const questionsURL = `https://opentdb.com/api.php?amount=${questionsNumber}&category=${category.value}&difficulty=${difficulty.value}`

        setQuizState({...quizState, state: 'quiz', questionsURL, points: 0})
    }

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch('https://opentdb.com/api_category.php');
            const data = await response.json();
    
            setCategories(data.trivia_categories)
        }

        getCategories()
    }, [])

    return (
        <form className="main-menu-container" onSubmit={e => submitHandler(e)} >

            <h1>Quiz start</h1>

            <input
                className="number-of-questions" 
                name="questions"
                type="number"
                min="5"
                max="50"
                placeholder="Input number of questions"
            />
            
            <select className="quiz-select" name="difficulty">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <select className="quiz-select" name="category">
                {categories.map(category => 
                    <option key={category.id} value={category.id}>{category.name}</option>
                )}
            </select>

            <button className="quiz-button" type="submit">Start Quiz</button>
        </form>
    )
}

export default MainMenu
