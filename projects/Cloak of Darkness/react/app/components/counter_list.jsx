/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var counter_1 = require('./counter');
var CounterList = (function (_super) {
    __extends(CounterList, _super);
    function CounterList() {
        _super.apply(this, arguments);
    }
    CounterList.prototype.render = function () {
        var _a = this.props, increment = _a.increment, decrement = _a.decrement;
        return (<ul>
      {this.props.counters.map(function (value, index) {
            return <li key={index}>
          <counter_1.Counter index={index} onIncrement={function () { return increment(index); }} onDecrement={function () { return decrement(index); }} value={value}/>
        </li>;
        })}
    </ul>);
    };
    return CounterList;
}(React.Component));
exports.CounterList = CounterList;
//# sourceMappingURL=counter_list.jsx.map