import { useContext } from 'react'

import { QuizContext } from './context/QuizContext'
import MainMenu from './components/MainMenu'
import Quiz from './components/Quiz'

import './App.css'

const App = () => {
    const [quizState, setQuizState] = useContext(QuizContext)

    return (
        <div className="App">
            <div className="App-body">
                {quizState.state === 'menu' && <MainMenu />}
                {quizState.state === 'quiz' && <Quiz />}
            </div>
        </div>
    )
}

export default App
