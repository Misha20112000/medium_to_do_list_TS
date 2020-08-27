//other import
import React, {useState} from 'react';
//styles
import styles from './AddNewTasks.module.scss';

//my components

interface IPropsTypes {
    addNewTask: (taskText: string) => void
}

export const AddNewTask: React.FC<IPropsTypes> = (props) => {

    const [taskText, setTaskText] = useState('');

    const addNewTask = () => {
        if (taskText)
            props.addNewTask(taskText);
        setTaskText('');
    };

    const setTaskText2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskText(e.target.value)
    };

    return (
        <div className={styles.addNewTasks}>
            <input placeholder='Write a new task here...'
                   value={taskText}
                   onChange={setTaskText2}/>
            <button onClick={addNewTask}>Add</button>
        </div>
    );
};