import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import routes from './router/index';

function App() {
    return (
        <div>
            <HashRouter>
                <Switch>
                    {routes.map(route => (
                        <Route key={route.pageId} component={route.component} exact
                            path={route.path}
                        />
                    ))}
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;