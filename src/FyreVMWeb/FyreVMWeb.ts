/*
 FyreVMWeb.ts

 Main Module to run FyreVM web engine (glulx-typescript).

 Exposes OutputReady event for web page to get data.
 Exposes sendCommand function for web pages to execute command.

 */

 /// <reference path='glulx-typescript/core/EngineWrapper.ts' />

var fyrevm = {};

function isEnterKey(e) {
    return e.code == "Enter";
}

module FyreVMWeb {

    export enum InputType {
        WAITING_FOR_KEY = 0,
        WAITING_FOR_LINE = 1
    }

    export enum StoryStatus {
        CONTINUE = 0,
        ENDED = 1
    }

    // export interface FyreVMManager {
    //     LoadStory(url: string);
    //     SendCommand(command: string): void;
    //     ChannelData: FyreVM.ChannelData;
    //     WaitingFor: InputType;
    //     Status: StoryStatus;
    //     SessionData: FyreVM.Quetzal;
    //     OutputReady: () => void;
    //     EngineState: number;
    // }

    export class Manager {

        ChannelData: FyreVM.ChannelData;
        WaitingFor: InputType;
        Status: StoryStatus;
        SessionData: FyreVM.Quetzal;
        OutputReady: () => void;
        EngineState: number;
        InputElement: HTMLInputElement;

        private wrapper: FyreVM.EngineWrapper;
        private saveKey: string;
        private quetzalData: FyreVM.Quetzal;
        private contentDefinition: string[];

        public LoadStory(url: string) {

            if (this.InputElement == undefined) {
                throw "FyreVM.Manager.InputElement must be defined before loading a story.";
            }

            this.InputElement.onkeypress = (e)=> {
                if (this.WaitingFor == FyreVMWeb.InputType.WAITING_FOR_KEY) {
                    this.SendCommand(this.InputElement.value);
                } else {
                    if (e.keyCode == 13 || isEnterKey(e)) {
                        this.SendCommand(this.InputElement.value);
                    }
                }
            };

            var reader = new XMLHttpRequest();
            reader.open('GET', url);
            reader.responseType = 'arraybuffer';
            reader.onreadystatechange = () => {
                if (reader.readyState === XMLHttpRequest.DONE) {
                    this.wrapper = FyreVM.EngineWrapper.loadFromArrayBuffer(reader.response, true);
                    this.ProcessCommand(this.wrapper.run());
                }
            }
            reader.send()
        }

        public SendCommand(command: string) {
            if (!localStorage['currentStoryInputs']) {
                localStorage['currentStoryInputs'] = JSON.stringify([]);
            }
            let newInputs = JSON.parse(localStorage['currentStoryInputs']);
            newInputs.push(command);
            localStorage['currentStoryInputs'] = JSON.stringify(newInputs);

            setTimeout( () => this.ProcessCommand(this.wrapper.receiveLine(command)), 0)
        }

        public ProcessCommand(result: FyreVM.EngineWrapperState) {
            this.Status = FyreVMWeb.StoryStatus.CONTINUE;

            if (result.channelData) {
                this.ChannelData = result.channelData;

                if (result.channelData['MAIN']) {
                    if (!localStorage['currentStoryContent']) {
                        localStorage['currentStoryContent'] = JSON.stringify([]);
                    }
                    let newContent = JSON.parse(localStorage['currentStoryContent']);
                    newContent.push(result.channelData['MAIN']);
                    localStorage['currentStoryContent'] = JSON.stringify(newContent);
                }
            }

            this.UpdateContent();

            switch (result.state) {
                case FyreVM.EngineState.waitingForKeyInput:
                    this.WaitingFor = FyreVMWeb.InputType.WAITING_FOR_KEY;
                    break;
                case FyreVM.EngineState.waitingForLineInput:
                    this.WaitingFor = FyreVMWeb.InputType.WAITING_FOR_LINE;
                    break;
                case FyreVM.EngineState.completed:
                    this.Status = FyreVMWeb.StoryStatus.ENDED;
                    break;
                case FyreVM.EngineState.waitingForLoadSaveGame:
                    this.saveKey = `fyrevm_saved_game_${Base64.fromByteArray(this.wrapper.getIFhd())}`;
                    this.quetzalData = FyreVM.Quetzal.load(Base64.toByteArray(localStorage[this.saveKey]));
                    setTimeout(() => this.ProcessCommand(this.wrapper.receiveSavedGame(this.quetzalData)),0);
                    break;
                case FyreVM.EngineState.waitingForGameSavedConfirmation:
                    let saveKey = `fyrevm_saved_game_${Base64.fromByteArray(result.gameBeingSaved.getIFhdChunk())}`;
                    let quetzalData = result.gameBeingSaved.base64Encode();
                    localStorage[saveKey] = quetzalData;
                    setTimeout(() => this.ProcessCommand(this.wrapper.saveGameDone(true)), 0);
                    break;
                default:
                    this.EngineState = result.state;
                    break;
            }

            this.OutputReady();
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

                fyrevm = {};

                for (var channelName in this.ChannelData) {

                    for (var ch=0; ch < this.contentDefinition.length; ch++) {
                        var channelDef = this.contentDefinition[ch];
                        var chanName = this.GetChannelName(channelDef['id']);
                        if (chanName == channelName) {

                            switch (channelDef['contentType']) {
                                case "text":
                                    fyrevm[channelDef['contentName']] = this.ChannelData[channelName];
                                    break;
                                case "number":
                                    fyrevm[channelDef['contentName']] = Number(this.ChannelData[channelName]);
                                    break;
                                case "json":
                                    fyrevm[channelDef['contentName']] = JSON.parse(this.ChannelData[channelName]);
                                    break;
                                case "css":
                                    fyrevm[channelDef['contentName']] = this.ChannelData[channelName];
                                    break;
                            }

                            break;
                        }
                    }
                }

                fyrevm['storyHistory'] = JSON.parse(localStorage['currentStoryContent'] || '[]');
                fyrevm['inputHistory'] = JSON.parse(localStorage['currentStoryInputs'] || '[]');

            }
        }
    }
}
