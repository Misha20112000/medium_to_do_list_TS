//other import
import React from 'react';
//styles
import styles from './Title.module.scss';
//my components

export const Title = () => {
    return (
        <div className={styles.title}>
            Simple to do list
            <div>
                Make things simple...
            </div>
        </div>
    );
};