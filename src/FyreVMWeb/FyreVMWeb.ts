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

    export enum States {
        INIT,
        RESTORE_SESSION,
        NEW_SESSION,
        WAITING_FOR_KEY,
        WAITING_FOR_LINE,
        COMMAND,
        SAVE,
        UPDATE_SESSION
    }

    export enum StoryStatus {
        CONTINUE,
        ENDED
    }

    export class Manager {

        ChannelData: FyreVM.ChannelData;
        State: States;
        Status: StoryStatus;
        OutputReady: () => void;
        InputElement: HTMLInputElement;

        private wrapper: FyreVM.EngineWrapper;
        private contentDefinition: string[];
        private ifid: string;

        private SetState(state: States) {
            this.State = state;

            switch(state) {
                case States.INIT:
                    this.Init();
                    break;
                case States.NEW_SESSION:
                    this.NewSession();
                    break;
                case States.RESTORE_SESSION:
                    this.RestoreSession();
                    break;
                case States.WAITING_FOR_LINE:
                    break;
                case States.COMMAND:
                    this.SendCommand(this.InputElement.value);
                    break;
                case States.SAVE:
                    this.SaveGame();
                    break;
            }
        }

        public LoadStory(url: string) {
            if (this.InputElement == undefined) {
                throw "FyreVM.Manager.InputElement must be defined before loading a story.";
            }

            this.InputElement.onkeypress = (e)=> {
                if (this.State == States.WAITING_FOR_KEY) {
                    this.SetState(States.COMMAND);
                } else if (this.State == States.WAITING_FOR_LINE) {
                    if (e.keyCode == 13 || isEnterKey(e)) {
                        this.SetState(States.COMMAND);
                    }
                }
            };

            var reader = new XMLHttpRequest();
            reader.open('GET', url);
            reader.responseType = 'arraybuffer';
            reader.onreadystatechange = () => {
                if (reader.readyState === XMLHttpRequest.DONE) {
                    this.wrapper = FyreVM.EngineWrapper.loadFromArrayBuffer(reader.response, true);
                    let run = this.wrapper.run();
                    this.ProcessResult(run);
                    this.SetState(States.INIT);
                }
            }
            reader.send()
        }

        private GetSaveData() {
            let saveKey = this.SaveKey();
            let saveData = localStorage[saveKey];
            if (saveData) { saveData = JSON.parse(saveData); }
            return saveData;
        }

        private Init() {
            let saveData = this.GetSaveData();

            if (!saveData) {
                this.SetState(States.NEW_SESSION);
            } else {
                this.SetState(States.RESTORE_SESSION);
            }
        }

        private NewSession() {
            let saveKey = this.SaveKey();
            localStorage[saveKey] = JSON.stringify(this.NewSaveGame());
            this.UpdateTurnData();
            this.OutputReady();
            this.SetState(States.WAITING_FOR_LINE);
        }

        private RestoreSession() {
            let result = this.wrapper.receiveLine('restore');
            if (result.state != FyreVM.EngineState.waitingForLoadSaveGame) {
                console.error('Error restoring saved game', result);
            }

            result = this.LoadSavedGame();

            if (result.state != FyreVM.EngineState.waitingForLineInput) {
                console.error('Error restoring saved game', result);
            }

            this.SetState(States.WAITING_FOR_LINE);
            this.UpdateTurnData();
            this.OutputReady();
        }

        public ProcessResult(result: FyreVM.EngineWrapperState) {
            if (result.channelData) {
                this.ChannelData = result.channelData;
            }
            this.UpdateContent();
        }

        private SendCommand(command: string) {
            this.UpdateCommand(command);
            console.log(command);
            let result = this.wrapper.receiveLine(command);
            this.ProcessCommand(result);
        }

        public ProcessCommand(result: FyreVM.EngineWrapperState) {
            this.Status = FyreVMWeb.StoryStatus.CONTINUE;

            this.ProcessResult(result);

            if (this.State == States.COMMAND) {
                this.UpdateStory(result);
                this.UpdateTurnData();
                this.OutputReady();
            }


            switch (result.state) {
                case FyreVM.EngineState.waitingForKeyInput:
                    if (this.State == States.COMMAND) { this.SetState(States.SAVE); }
                    else { this.SetState(States.WAITING_FOR_KEY); }
                    break;
                case FyreVM.EngineState.waitingForLineInput:
                    if (this.State == States.COMMAND) { this.SetState(States.SAVE); }
                    else { this.SetState(States.WAITING_FOR_LINE); }
                    break;
                case FyreVM.EngineState.completed:
                    this.Status = FyreVMWeb.StoryStatus.ENDED;
                    break;
                case FyreVM.EngineState.waitingForLoadSaveGame:
                    this.LoadSavedGame();
                    break;
                case FyreVM.EngineState.waitingForGameSavedConfirmation:
                    this.UpdateSavedGame(result);
                    break;
            }
        }

        private NewSaveGame() {
            let storyInfo = JSON.parse(this.ChannelData['INFO']);
            let ifid = this.GetIFID();
            let content = `<b>Title: </b>${storyInfo['storyTitle']}<br/>
                <b>Headline: </b>${storyInfo['storyHeadline']}`;

            return {
                story: {
                    'ifid': ifid,
                    'title': storyInfo['storyTitle'],
                    'storyInfo': storyInfo,
                    'storyFile': ''
                },
                'sessions': [
                    {
                        'session': 1,
                        'turns': 1,
                        'content': [
                            { 'turn': 1, 'command': '', 'content': content }
                        ],
                        'data': [
                        ]
                    }
                ]
            }
        }

        private SaveGame() {
            this.ProcessCommand(this.wrapper.receiveLine('save'));
        }

        private LoadSavedGame() {
            let saveData = this.GetSaveData();
            let turns = saveData['sessions'][0]['turns'];
            let saveGameData = saveData['sessions'][0]['data'][turns]['data'];
            let quetzalData = FyreVM.Quetzal.load(Base64.toByteArray(saveGameData));
            return this.wrapper.receiveSavedGame(quetzalData);
        }

        private UpdateSavedGame(result) {
            let saveKey = this.SaveKey();
            let saveDataStr = localStorage[saveKey];
            let saveData = null;

            if (!saveDataStr) {
                saveData = this.NewSaveGame();
            } else {
                saveData = JSON.parse(saveDataStr);
            }

            let turns = saveData['sessions'][0]['turns'];
            saveData['sessions'][0]['data'][turns] = {
                'turn': turns, 'data': result.gameBeingSaved.base64Encode()
            };

            localStorage[saveKey] = JSON.stringify(saveData);

            this.ProcessCommand(this.wrapper.saveGameDone(true));
        }

        private LoadSession() {
            let saveKey = this.SaveKey();
            let saveData = localStorage[saveKey];
            saveData = JSON.parse(saveData);
            let session = saveData['sessions'][0];
            return session;
        }

        private SaveSession(session) {
            let saveKey = this.SaveKey();
            let saveData = localStorage[saveKey];
            saveData = JSON.parse(saveData);
            saveData['sessions'][0] = session;
            localStorage[saveKey] = JSON.stringify(saveData);
        }

        private UpdateCommand(command) {
            let session = this.LoadSession();

            session['turns']++;

            session['content'].push({
                turn: session['turns'],
                command: command,
                content: ''
            });

            this.SaveSession(session);
        }

        private UpdateStory(result) {
            if (result.channelData && result.channelData['MAIN']) {
                let content = result.channelData['MAIN'];
                let session = this.LoadSession();
                let turn = session['turns'];
                session['content'][turn-1]['content'] = content;
                this.SaveSession(session);
            }
        }

        private UpdateTurnData() {
            let saveKey = this.SaveKey();
            let saveData = localStorage[saveKey];
            if (!saveData) { return; }
            saveData = JSON.parse(saveData);
            let content = saveData['sessions'][0]['content'];
            fyrevm['content'] = content;
        }

        private SaveKey() {
            return this.GetIFID();
        }

        private GetIFID() {
            if (!this.ifid) {
                this.ifid = this.ChannelData['IFID'].replace(/\//g, '');
            }
            return this.ifid;
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
            }
        }
    }
}
