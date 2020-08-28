//other import
import React from 'react';
//styles
import styles from './Buttons.module.scss';

//my components

interface IPropsTypes {
    deleteAll: () => void
    toggleBasketCondition: () => void
    toggleAboutProgramCondition: () => void
    tasks: Array<ITaskType>
    changeTheme: () => void
}

export const Buttons: React.FC<IPropsTypes> = (props) => {

    const deleteAll = () => {
        props.deleteAll();
    };

    let tasksLS: any = localStorage.getItem('tasksLS');
    if (!tasksLS) {
        tasksLS = [];
    } else {
        tasksLS = JSON.parse(tasksLS);
    }

    return (
        <div className={styles.buttons}>
            <button onClick={deleteAll} className={props.tasks.length === 0 ? `${styles.delete} ${styles.disabled}` : styles.delete}>Delete all</button>
            <button onClick={props.toggleBasketCondition} className={styles.basket}>
                <div className={styles.counter}>{tasksLS.length}</div>
                Basket
            </button>
            <button onClick={props.toggleAboutProgramCondition} className={styles.about}>About program</button>
            <button onClick={props.changeTheme} className={styles.theme}>Theme</button>
        </div>
    );
};