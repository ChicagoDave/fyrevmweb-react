/// <reference path="../../typings/tsd.d.ts" />
"use strict";
const React = require('react');
const COLORS = ['blue', 'green', 'red'];
class Counter extends React.Component {
    render() {
        const style = {
            color: COLORS[this.props.index % COLORS.length],
        };
        const { index, value, onIncrement, onDecrement } = this.props;
        return (<div>
        <p style={style}>Counters {index + 1}: {value}</p>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
      </div>);
    }
}
exports.Counter = Counter;
//# sourceMappingURL=counter.jsx.map