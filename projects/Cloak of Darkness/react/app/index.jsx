/// <reference path="../typings/tsd.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDOM = require('react-dom');
var redux_1 = require('redux');
var react_redux_1 = require('react-redux');
var app_1 = require('./components/app');
var reducers_1 = require('./reducers');
;
function configureStore() {
    var store = redux_1.createStore(reducers_1.counterApp);
    if (module.hot) {
        module.hot.accept('./reducers', function () {
            var nextRootReducer = require('./reducers').counterApp;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
var store = configureStore();
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    Main.prototype.render = function () {
        return (<react_redux_1.Provider store={store}>
      <app_1.App />
    </react_redux_1.Provider>);
    };
    return Main;
}(React.Component));
ReactDOM.render(<Main />, document.getElementById('app'));
//# sourceMappingURL=index.jsx.map