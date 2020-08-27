//other import
import React from 'react';
//styles
import styles from './Basket.module.scss';

//my components

interface IPropsTypes {
    condition: boolean
    tasks: Array<ITaskType>
}

export const Basket: React.FC<IPropsTypes> = ({condition}) => {

    const tasksFromLS = localStorage.getItem('tasksLS');
    let data: Array<ITaskType>;
    if(!tasksFromLS) {
        data = [];
    } else {
        data = JSON.parse(tasksFromLS);
    }

    let completedTasksAfterMap = data.map(task => <div key={task.id}>{task.text}</div>);

    return (
        <div className={condition ? `${styles.basket} ${styles.showBasket}` : styles.basket}>
            {completedTasksAfterMap.length > 0 ? completedTasksAfterMap : 'Корзина порожня'}
        </div>
    );
};