import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import {Provider} from "react-redux"
import { ConnectedRouter } from 'connected-react-router';
import {store,history} from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <ConnectedRouter history={history}>
    <Switch>
    <Route path="/" component={App} />
    </Switch>
    </ConnectedRouter>
    </Provider>
    
);

