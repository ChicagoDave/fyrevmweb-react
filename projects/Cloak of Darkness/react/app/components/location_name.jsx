/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../FyreVMWeb.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var LocationName = (function (_super) {
    __extends(LocationName, _super);
    function LocationName() {
        _super.apply(this, arguments);
    }
    LocationName.prototype.render = function () {
        return (<div>
                <span>{this.text}</span>
            </div>);
    };
    return LocationName;
}(React.Component));
exports.LocationName = LocationName;
//# sourceMappingURL=location_name.jsx.map