/// <reference path="../typings/tsd.d.ts" />
"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const app_1 = require('./components/app');
const reducers_1 = require('./reducers');
;
function configureStore() {
    const store = redux_1.createStore(reducers_1.counterApp);
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').counterApp;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
const store = configureStore();
class Main extends React.Component {
    render() {
        return (<react_redux_1.Provider store={store}>
      <app_1.App />
    </react_redux_1.Provider>);
    }
}
ReactDOM.render(<Main />, document.getElementById('app'));
//# sourceMappingURL=index.jsx.map