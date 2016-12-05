/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require('react');
var react_redux_1 = require('react-redux');
var actions_1 = require('../actions');
var counter_list_1 = require('./counter_list');
function select(state) {
    return {
        counters: state.counters,
    };
}
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        var _a = this.props, dispatch = _a.dispatch, counters = _a.counters;
        return (<div>
        <counter_list_1.CounterList counters={counters} increment={function (index) { return dispatch(actions_1.incrementCounter(index)); }} decrement={function (index) { return dispatch(actions_1.decrementCounter(index)); }}/>

        <button onClick={function () { return dispatch(actions_1.addCounter()); }}>Add Counter</button>
      </div>);
    };
    App = __decorate([
        react_redux_1.connect(select), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}(React.Component));
exports.App = App;
//# sourceMappingURL=app.jsx.map