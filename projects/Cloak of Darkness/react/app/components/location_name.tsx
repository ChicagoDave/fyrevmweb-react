/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../FyreVMWeb.ts" />

import * as React from 'react';
//import { FyreVMWeb } from 'FyreVMWeb';

interface ILocationName {
    text: string;
}

export class LocationName extends React.Component<ILocationName, {}> {
    private text: string;

    public render(): React.ReactElement<{}> {
        return (
            <div>
                <span>{this.text}</span>
            </div>
        );
    }
}
