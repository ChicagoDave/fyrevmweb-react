/*
    FyreVMWeb.ts

    Main Module to run FyreVM web engine (glulx-typescript).

    Exposes onReady event for web page to get data.
    Exposes sendCommand function for web pages to execute command.

*/

/// <reference path='../../glulx-typescript/EngineWrapper.ts' />

module FyreVMWeb {

    export enum InputType {
        WAITING_FOR_KEY = 0,
        WAITING_FOR_LINE = 1
    }

    export enum StoryStatus {
        CONTINUE = 0,
        ENDED = 1
    }

    export interface OutputReadyEvent {
        (channelData: FyreVM.ChannelData): void;
    }

    export interface FyreVMManager {
        LoadStory(url: string);
        SendCommand(command: string): void;
        ChannelData: FyreVM.ChannelData;
        WaitingFor: InputType;
        Status: StoryStatus;
        SessionData: FyreVM.Quetzal;
        OutputReady: OutputReadyEvent;
        EngineState: number;
    }

    export class Manager implements  FyreVMManager {

        ChannelData: FyreVM.ChannelData;
        WaitingFor: InputType;
        Status: StoryStatus;
        SessionData: FyreVM.Quetzal;
        OutputReady: OutputReadyEvent;
        EngineState: number;

        private wrapper: FyreVM.EngineWrapper;
        private saveKey: string;
        private quetzalData: string;

        LoadStory(url: string) {
            var reader = new XMLHttpRequest();
            reader.open('GET', url);
            reader.responseType = 'arraybuffer';
            if (reader.readyState === XMLHttpRequest.DONE) {
                this.wrapper = FyreVM.EngineWrapper.loadFromArrayBuffer(reader.response, true);
                setTimeout( () => this.ProcessCommand(this.wrapper.run()), 0);
            }
            reader.send()

        }

        SendCommand(command: string) {
            setTimeout( () => this.ProcessCommand(this.wrapper.receiveLine(command)), 0)
        }

        ProcessCommand(result: FyreVM.EngineWrapperState) {
            this.Status = StoryStatus.CONTINUE;

            switch (result.state) {
                case FyreVM.EngineState.waitingForKeyInput:
                    this.WaitingFor = InputType.WAITING_FOR_KEY;
                    break;
                case FyreVM.EngineState.waitingForLineInput:
                    this.WaitingFor = InputType.WAITING_FOR_LINE;
                    break;
                case FyreVM.EngineState.completed:
                    this.Status = StoryStatus.ENDED;
                    break;
                case FyreVM.EngineState.waitingForLoadSaveGame:
                    this.saveKey = `fyrevm_saved_game_${Base64.fromByteArray(this.wrapper.getIFhd())}`;
                    this.quetzalData = localStorage[this.saveKey];
                    if (this.quetzalData) {
                        this.quetzalData = FyreVM.Quetzal.base64Decode(this.quetzalData)
                    }
                    setTimeout(() => this.ProcessCommand(this.wrapper.receiveSavedGame(this.quetzalData)),0);
                    break;
                case FyreVM.EngineState.waitingForGameSavedConfirmation:
                    let saveKey = `fyrevm_saved_game_${Base64.fromByteArray(result.gameBeingSaved.getIFhdChunk())}`;
                    let quetzalData = result.gameBeingSaved.base64Encode();
                    localStorage[key] = q;
                    setTimeout(
                        () => process(w.saveGameDone(true))
                        , 0);
                    break;
                default:
                    this.EngineState = result.state;
                    break;

            }

            this.OutputReady(result.channelData);
        }
    }
}