/// <reference path="../../typings/tsd.d.ts" />
"use strict";
const React = require('react');
const counter_1 = require('./counter');
class CounterList extends React.Component {
    render() {
        const { increment, decrement } = this.props;
        return (<ul>
      {this.props.counters.map((value, index) => <li key={index}>
          <counter_1.Counter index={index} onIncrement={() => increment(index)} onDecrement={() => decrement(index)} value={value}/>
        </li>)}
    </ul>);
    }
}
exports.CounterList = CounterList;
//# sourceMappingURL=counter_list.jsx.map