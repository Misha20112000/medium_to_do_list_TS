//other import
import React, {useState} from 'react';
//styles
import styles from './Task.module.scss';

interface IPropsTypes {
    task: ITaskType
    performTask: (id: string) => void
    deleteTask: (id: string) => void
    editModeHandler: (id: string, newInputValue: string) => void
}

export const Task: React.FC<IPropsTypes> = ({task, performTask, deleteTask, editModeHandler}) => {

    const [inputValue, setInputValue] = useState(task.text);

    const perform = () => {
        performTask(task.id);
    };

    const deleteTask2 = () => {
        deleteTask(task.id);
    };

    const changeEditMode = () => {
        editModeHandler(task.id, inputValue);
    };

    return (
        <div className={task.done
            ? `${styles.task} ${styles.doneTask}`
            : `${styles.task} ${styles.unactedTask}`}>
            {
                task.editMode
                    ? <input autoFocus={true} onChange={(e) => setInputValue(e.target.value)} value={inputValue}/>
                    : <div className={styles.text}>{task.text}</div>
            }

            <div className={styles.buttons}>
                <button onClick={changeEditMode} className={styles.edit}>Edit</button>
                <button onClick={perform} className={styles.done}>Complete</button>
                <button onClick={deleteTask2} className={styles.delete}>Delete</button>
            </div>
        </div>
    );
};