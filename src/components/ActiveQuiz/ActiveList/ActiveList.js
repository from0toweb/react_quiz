import React from 'react';
import { ActiveItem } from './ActiveItem/ActiveItem';
import classes from './ActiveList.module.css';

export const ActiveList = props => {
    return (
        <ul className={classes.ActiveList}>
            {props.answers.map((answer, index) => {
                return (
                    <ActiveItem
                        key={index}
                        answer={answer}
                        onAnswerClick={props.onAnswerClick}
                        state={props.state ? props.state[answer.id] : null}
                    />
                );
            })}
        </ul>
    );
};
