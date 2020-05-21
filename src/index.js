import React from 'react';
import {hydrate, render} from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
    hydrate(<Router>
        <App/>
    </Router>, rootElement);
} else {
    render(<Router>
        <App/>
    </Router>, rootElement);
}

registerServiceWorker();