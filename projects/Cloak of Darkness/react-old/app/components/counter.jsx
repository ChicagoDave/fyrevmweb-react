/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var COLORS = ['blue', 'green', 'red'];
var Counter = (function (_super) {
    __extends(Counter, _super);
    function Counter() {
        _super.apply(this, arguments);
    }
    Counter.prototype.render = function () {
        var style = {
            color: COLORS[this.props.index % COLORS.length],
        };
        var _a = this.props, index = _a.index, value = _a.value, onIncrement = _a.onIncrement, onDecrement = _a.onDecrement;
        return (<div>
        <p style={style}>Counters {index + 1}: {value}</p>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
      </div>);
    };
    return Counter;
}(React.Component));
exports.Counter = Counter;
//# sourceMappingURL=counter.jsx.map