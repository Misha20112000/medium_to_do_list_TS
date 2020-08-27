//other import
import React from 'react';
//styles
import styles from './AboutProgram.module.scss';

//my components

interface IPropsTypes {
    condition: boolean
}

export const AboutProgram: React.FC<IPropsTypes> = ({condition}) => {

    return (
        <div className={condition ? `${styles.aboutProgram} ${styles.showAboutProgram}` : styles.aboutProgram}>
            // small descr
        </div>
    );
};