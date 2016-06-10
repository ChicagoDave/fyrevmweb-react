/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const React = require('react');
const react_redux_1 = require('react-redux');
const actions_1 = require('../actions');
const counter_list_1 = require('./counter_list');
function select(state) {
    return {
        counters: state.counters,
    };
}
let App = class App extends React.Component {
    render() {
        const { dispatch, counters } = this.props;
        return (<div>
        <counter_list_1.CounterList counters={counters} increment={(index) => dispatch(actions_1.incrementCounter(index))} decrement={(index) => dispatch(actions_1.decrementCounter(index))}/>

        <button onClick={() => dispatch(actions_1.addCounter())}>Add Counter</button>
      </div>);
    }
};
App = __decorate([
    react_redux_1.connect(select), 
    __metadata('design:paramtypes', [])
], App);
exports.App = App;
//# sourceMappingURL=app.jsx.map