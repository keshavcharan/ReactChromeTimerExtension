import React from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './reactComponents/mainComponent.js'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter><MainComponent/></BrowserRouter>, document.getElementById('app'))