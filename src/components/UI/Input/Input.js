import React from 'react';
import classes from './Input.module.css';

function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched;
}

const Input = props => {
    const inputType = props.type || 'text';
    const inputCls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        inputCls.push(classes.invalid);
    }

    return (
        <div className={inputCls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {isInvalid(props) && (
                <span>{props.errorMessage || 'Данные не верны'}</span>
            )}
        </div>
    );
};

export default Input;
