import React from 'react';
import './QuestionCard.css';
import { AnswerObject } from '../App';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const correct = (userAnswer: any, answer: string): boolean => {
  return userAnswer === answer;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <div className='App'>
      <p className='nummber'>
        Question: {questionNr} / {totalQuestions}
      </p>
      <h3 dangerouslySetInnerHTML={{ __html: question }}></h3>
      <div>
        {answers.map((answer, key) => (
          <div key={key}>
            <button
              className='option-btn'
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
              style={
                correct(userAnswer?.correctAnswer, answer)
                  ? { background: '#17C3B2' }
                  : { background: '#FFF9A5' }
              }
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
