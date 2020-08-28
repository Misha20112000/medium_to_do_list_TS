//other import
import React from 'react';
//styles
import styles from './Basket.module.scss';

//my components

interface IPropsTypes {
    condition: boolean
    tasks: Array<ITaskType>
    toggleBasketCondition: () => void
}

export const Basket: React.FC<IPropsTypes> = ({condition, toggleBasketCondition}) => {

    const tasksFromLS = localStorage.getItem('tasksLS');

    let data: Array<ITaskType>;
    if (!tasksFromLS) {
        data = [];
    } else {
        data = JSON.parse(tasksFromLS);
    }

    const cleanBasket = () => {
        if (data.length !== 0) {
            localStorage.setItem('tasksLS', JSON.stringify([]));
            toggleBasketCondition();
        }
    };

    let completedTasksAfterMap = data.map(task => <div key={task.id}
                                                       className={task.done ? styles.done : styles.notDone}>{task.text}</div>);

    return (
        <div className={condition ? `${styles.basket} ${styles.showBasket}` : styles.basket}>
            <div onClick={toggleBasketCondition} className={styles.close}>X Close</div>
            {completedTasksAfterMap.length > 0 ? completedTasksAfterMap : 'Корзина порожня'}
            <div onClick={cleanBasket} className={styles.clean}>clean the basket</div>
        </div>
    );
};