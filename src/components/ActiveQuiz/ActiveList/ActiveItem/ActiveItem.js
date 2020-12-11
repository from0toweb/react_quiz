import React from 'react';
import classes from './ActiveItem.module.css';

export const ActiveItem = props => {
    const itemClass = [classes.ActiveItem];

    if (props.state) {
        itemClass.push(classes[props.state]);
    }
    return (
        <li
            onClick={() => props.onAnswerClick(props.answer.id)}
            className={itemClass.join(' ')}
        >
            {props.answer.value}
        </li>
    );
};
