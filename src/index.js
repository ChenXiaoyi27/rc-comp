import './reset.css';
import './global.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import routes from './router';

const App = () => (
    <HashRouter>
        <Switch>
            {routes.map(route => <Route exact path={route.path} component={route.component} key={route.dm} />)}
        </Switch>
    </HashRouter>
);

ReactDOM.render(<App style={{ minWidth: "800px" }} />, document.getElementById('root'));
