//other import
import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
//images
import space from './../assets/img/space.jpg';
import space2 from './../assets/img/space2.jpg';
import earth from './../assets/img/earth.jpg';
import earth2 from './../assets/img/earth2.jpg';
import mountain from './../assets/img/mountain.jpg';
import violetSky from './../assets/img/violetSky.jpg';
import northernLights from './../assets/img/northernLights.jpg';
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

    const imagesArray = [space, space2, earth, earth2, mountain, violetSky, northernLights];

    // const [imagesCount, setImagesCount] = useState(0);

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
        <div style={{backgroundImage: `url(${imagesArray[6]})`}} className={styles.app}>
            <div className={styles.eclipse}> </div>
            <div className={`${styles.content} container`}>
                <Basket tasks={tasks} condition={basketCondition}/>
                <AboutProgram condition={aboutProgramCondition}/>
                <Title/>
                <Buttons tasks={tasks}
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