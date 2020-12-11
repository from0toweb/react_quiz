import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = ({ returnFun, quiz, results }) => {
    const successCount = Object.keys(results).reduce((total, key) => {
        if (results[key] === 'success') {
            total++;
        }
        return total;
    }, 0);
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {quiz.map((question, index) => {
                    const itemClass = [
                        'fa',
                        results[question.id] === 'error'
                            ? 'fa-times'
                            : 'fa-check',
                        classes[results[question.id]],
                    ];
                    return (
                        <li key={index}>
                            <strong>{question.id}. </strong>
                            {question.question}
                            <i className={itemClass.join(' ')} />
                        </li>
                    );
                })}
            </ul>

            <p>
                Правильно {successCount}/{quiz.length}
            </p>
            <div>
                <Button type="primary" onClick={returnFun}>
                    Повторить
                </Button>
                <Link to="/">
                    <Button type="success">Посмотреть список тестов</Button>
                </Link>
            </div>
        </div>
    );
};

export default FinishedQuiz;
