//other import
import React from 'react';
//styles
import styles from './TasksNumber.module.scss';

interface IPropsTypes {
    tasks: Array<ITaskType>
}

export const TasksNumber: React.FC<IPropsTypes> = ({tasks}) => {

    const tasksNumber = tasks.filter(task => !task.done).length;

    return (
        <div className={styles.tasksNumber}>
            Active tasks: {tasksNumber}
        </div>
    );
};