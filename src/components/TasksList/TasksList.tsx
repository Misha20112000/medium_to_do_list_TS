import React from 'react';
import {Task} from './Task/Task';

interface IPropsTypes {
    tasks: Array<ITaskType>
    performTask: (id: string) => void
    deleteTask: (id: string) => void
    editModeHandler: (id: string, newInputValue: string) => void
}

export const TasksList: React.FC<IPropsTypes> = ({tasks, performTask, deleteTask, editModeHandler}) => {

    const unCompletedTasks = tasks.filter(task => !task.done);
    const completedTasks = tasks.filter(task => task.done);

    const tasksAfterMap = [...unCompletedTasks, ...completedTasks].map(task => <Task key={task.id}
                                                                                     task={task}
                                                                                     editModeHandler={editModeHandler}
                                                                                     deleteTask={deleteTask}
                                                                                     performTask={performTask}/>);

    return (
        <div>
            {tasksAfterMap.length > 0 ? tasksAfterMap : <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '10px',
                marginTop: '10px',
                borderRadius: '3px',
                cursor: 'default',
            }
            }>У вас немає завдань</div>}
        </div>
    );
};