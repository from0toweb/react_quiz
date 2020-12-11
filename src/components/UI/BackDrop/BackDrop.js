import React from 'react';
import classes from './BackDrop.module.css';

const BackDrop = ({ menuClose }) => {
    return <div className={classes.BackDrop} onClick={menuClose}></div>;
};

export default BackDrop;
