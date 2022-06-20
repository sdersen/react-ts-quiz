import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import './App.css';
import { getQuestions } from './api';
import { Difficulty, QuestionState } from './api';
import { IoFlower } from 'react-icons/io5';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  //Insert try catch here...
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await getQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore((prev) => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className='App'>
      <div className='flowes'>
        <IoFlower size='40' fill='yellow' />
        <IoFlower size='40' fill='blue'/>
        <IoFlower size='40' fill='pink'/>
        <IoFlower size='40' fill='red'/>
        <IoFlower size='40' fill='green'/>
      </div>
      <h1>The amazing midsummer quiz</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
        <button className='start-btn' onClick={startQuiz}>
          Start quiz!
        </button>
      ) : null}
      {!gameOver ? <p className='score'>Score: {score}</p> : null}
      {loading ? <p>Loading questions...</p> : null}
      {!loading && !gameOver ? (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}
      {!gameOver &&
      !loading &&
      userAnswer.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next-question' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
};

export default App;
