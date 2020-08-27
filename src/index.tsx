//other import
import React from 'react';
import ReactDOM from 'react-dom';
//styles
import './resetScss/reset.scss';
//my components
import {App} from './components/App';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

