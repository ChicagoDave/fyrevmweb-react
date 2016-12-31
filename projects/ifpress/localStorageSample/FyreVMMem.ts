/*
 FyreVMMem.ts

 Main Module to run FyreVM engine (glulx-typescript) in-memory.

 Exposes OutputReady event for web page to get data.
 Exposes sendCommand function for web pages to execute command.

*/

/// <reference path='glulx-typescript/EngineWrapper.ts' />

module FyreVMMem {

    export class Manager {

        FyreVMData: {};
        ChannelData: FyreVM.ChannelData;
        SessionData: FyreVM.Quetzal;
        EngineState: number;

        private wrapper: FyreVM.EngineWrapper;
        private saveKey: string;
        private quetzalData: FyreVM.Quetzal;
        private contentDefinition: string[];

        public LoadStory(storyFile: ArrayBuffer) {
            this.wrapper = FyreVM.EngineWrapper.loadFromArrayBuffer(storyFile, true);
            this.ProcessCommand(this.wrapper.run());
            this.FyreVMData['storyFile'] = storyFile;
            this.FyreVMData['quetzalData'] = this.wrapper.saveGame();
            return this.FyreVMData;
        }

        public ProcessCommand(result: FyreVM.EngineWrapperState) {
            this.ChannelData = result.channelData;
            this.UpdateContent();
        }

        private GetChannelName(x:number){
            return String.fromCharCode(
                x >> 24,
                (x >> 16) & 0xFF,
                (x >> 8) & 0xFF,
                x & 0xFF);
        }

        private UpdateContent() {
            if (this.ChannelData["CMGT"] != undefined || this.contentDefinition != undefined) {

                //
                // We only get the content definition on first turn... (may need to revisit this)
                //
                if (this.contentDefinition == undefined) {
                    this.contentDefinition = JSON.parse(this.ChannelData["CMGT"]);
                }

                this.FyreVMData = {};

                for (var channelName in this.ChannelData) {

                    for (var ch=0; ch < this.contentDefinition.length; ch++) {
                        var channelDef = this.contentDefinition[ch];
                        var chanName = this.GetChannelName(channelDef['id']);
                        if (chanName == channelName) {

                            switch (channelDef['contentType']) {
                                case "text":
                                    this.FyreVMData[channelDef['contentName']] = this.ChannelData[channelName];
                                    break;
                                case "number":
                                    this.FyreVMData[channelDef['contentName']] = Number(this.ChannelData[channelName]);
                                    break;
                                case "json":
                                    this.FyreVMData[channelDef['contentName']] = JSON.parse(this.ChannelData[channelName]);
                                    break;
                                case "css":
                                    this.FyreVMData[channelDef['contentName']] = this.ChannelData[channelName];
                                    break;
                            }

                            break;
                        }
                    }
                }

            }
        }
    }
}