//other import
import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
//images
import space from './../assets/img/space.jpg';
import earth from './../assets/img/earth.jpg';
import earth2 from './../assets/img/earth2.jpg';
import mountain from './../assets/img/mountain.jpg';
import violetSky from './../assets/img/violetSky.jpg';
import northernLights from './../assets/img/northernLights.jpg';
import milkyWay from './../assets/img/milkyWay.jpg';
import nightForest from './../assets/img/nightForest.jpg';
import tree from './../assets/img/tree.jpg';
import road from './../assets/img/road.jpg';
import nightTravell from './../assets/img/nightTravell.jpg';
//styles
import styles from './App.module.scss';
//my components
import {TasksNumber} from './TasksNumber/TasksNumber';
import {AddNewTask} from './AddNewTask/AddNewTask';
import {TasksList} from './TasksList/TasksList';
import {Title} from './Title/Title';
import {Buttons} from './Buttons/Buttons';
import {Basket} from './Basket/Basket';
import {AboutProgram} from './AboutProgram/AboutProgram';

export const App = () => {

    const imagesArray = [tree, space, earth, earth2, nightTravell, mountain, violetSky, road, northernLights, milkyWay, nightForest];

    const [imagesCount, setImagesCount] = useState(0);

    const changeTheme = (): void => {
        setImagesCount(prevState => {
            if (imagesCount < imagesArray.length -1) {
                return ++prevState
            } else {
                return 0;
            }
        });
    };

    const [tasks, setTasks] = useState<Array<ITaskType>>([]);

    const [aboutProgramCondition, setAboutProgramCondition] = useState(false);

    const [basketCondition, setBasketCondition] = useState(false);

    const addNewTask = (taskText: string): void => {
        const task = {text: taskText, done: false, editMode: false, id: uuidv4()};
        setTasks(prevTasks => [task, ...prevTasks])
    };

    const performTask = (id: string) => {
        const newTasks = [...tasks];
        const index = newTasks.map(task => task.id).indexOf(id);
        newTasks[index].done = true;
        setTasks(newTasks);
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
        let tasksLS: any = localStorage.getItem('tasksLS');
        if (!tasksLS) {
            tasksLS = [];
        } else {
            tasksLS = JSON.parse(tasksLS);
        }
        const newTasks = [...tasks];
        const index = newTasks.map(task => task.id).indexOf(id);
        localStorage.setItem('tasksLS', JSON.stringify([newTasks[index], ...tasksLS]));
    };

    const deleteAll = () => {
        setTasks([]);
        let tasksLS: any = localStorage.getItem('tasksLS');
        if (!tasksLS) {
            tasksLS = [];
        } else {
            tasksLS = JSON.parse(tasksLS);
        }
        localStorage.setItem('tasksLS', JSON.stringify([...tasks, ...tasksLS]));
    };

    const toggleBasketCondition = () => {
        setBasketCondition(!basketCondition);
    };

    const toggleAboutProgramCondition = () => {
        setAboutProgramCondition(!aboutProgramCondition);
    };

    const editModeHandler = (id: string, newInputValue: string) => {
        const newTasks = [...tasks];
        const index = newTasks.map(task => task.id).indexOf(id);
        newTasks[index].editMode = !newTasks[index].editMode;
        newTasks[index].text = newInputValue;
        setTasks(newTasks);
    };

    return (
        <div style={{backgroundImage: `url(${imagesArray[imagesCount]})`}} className={styles.app}>
            <div className={styles.eclipse}></div>
            <div className={`${styles.content} container`}>
                <Basket toggleBasketCondition={toggleBasketCondition} tasks={tasks} condition={basketCondition}/>
                <AboutProgram condition={aboutProgramCondition}/>
                <Title/>
                <Buttons tasks={tasks}
                         changeTheme={changeTheme}
                         toggleBasketCondition={toggleBasketCondition}
                         toggleAboutProgramCondition={toggleAboutProgramCondition}
                         deleteAll={deleteAll}/>
                <AddNewTask addNewTask={addNewTask}/>
                <TasksNumber tasks={tasks}/>
                <TasksList editModeHandler={editModeHandler}
                           tasks={tasks}
                           performTask={performTask}
                           deleteTask={deleteTask}/>
            </div>
        </div>
    );
};