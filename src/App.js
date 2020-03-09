import React from 'react';
import Routes from './routes/index';
import history from './service/history';
import { Router } from 'react-router-dom';

const App = () => (
    <div className="App">
        <Router history={history}>
            <Routes />
        </Router>
    </div>
);

export default App;