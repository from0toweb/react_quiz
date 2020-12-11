import classes from './ActiveQuiz.module.css';
import React from 'react';
import { ActiveList } from './ActiveList/ActiveList';

export const ActiveQuiz = props => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.activeQuestion}.</strong>&nbsp;{' '}
                    {props.question}
                </span>

                <small>
                    {props.activeQuestion} из {props.quizLength}
                </small>
            </p>

            <ActiveList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                state={props.state}
            />
        </div>
    );
};
