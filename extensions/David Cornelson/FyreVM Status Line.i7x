Version 1/022317 of FyreVM Status Line by David Cornelson begins here.

Section 1 - Defining the parts of the status line

The Status Line is a thing.
The Status Line has some text called Location Name.
The Status Line has some text called Location Addendum.
The Status Line has some text called Story Time.
The Status Line has some text called Story Score.
The Status Line has a number called Story Turn.
The Status Line has a truth state called Show Location Name. The Show Location Name of The Status Line is true.
The Status Line has a truth state called Show Location Addendum. The Show Location Addendum of The Status Line is false.
The Status Line has a truth state called Show Story Time. The Show Story Time of The Status Line is true.
The Status Line has a truth state called Show Story Score. The Show Story Time of The Status Line is true.
The Status Line has a truth state called Show Story Turn. The Show Story Time of The Status Line is true.

Section 2 - Status Line channel for defining the status line details

statusline-channel is a channel with content name "statusLineContent" and content type "text".

To define status line:
	say "[on statusline-channel]{ 'showLocationName': [Show Location Name of The Status Line], 'showLocationAddendum': [Show Location Addendum of The Status Line], 'showStoryTime': [Show Story TIme of The Status Line], 'showStoryScore': [Show Story Score of The Status Line], 'showStoryTurn': [Show Story Turn of The Status Line] }[end]";

To show the location name:
	now show location name of the status line is true.
	
To hide the location name:
	now show location name of the status line is false.

To show the location addendum:
	now show location addendum of the status line is true.
	
To hide the location addendum:
	now show location addendum of the status line is false.

To show the story time:
	now show story time of the status line is true.
	
To hide the story time:
	now show story time of the status line is false.

To show the story score:
	now show story score of the status line is true.
	
To hide the story score:
	now show story score of the status line is false.

To show the story turn:
	now show story turn of the status line is true.
	
To hide the story turn:
	now show story turn of the status line is false.

When play begins when outputting channels:
	define status line.

Every turn when outputting channels:
	define status line.

FyreVM Status Line ends here.

---- DOCUMENTATION ----

FyreVM Status Line defines which parts of the standard status line are displayed.

These parts include:
	- location name
	- location addendum
	- story time
	- story score
	- story turn
	
The author can show/hide any of these with the following statements:
	
	show the location name.
	
	hide the location name.
	
	show the location addendum.
	
	hide the location addendum.
	
	show the story time.
	
	hide the story time.
	
	show the story score.
	
	hide the story score.
	
	show the story turn.
	
	hide the story turn.

The statusline-channel will emit the details in JSON format to be handled by the UI template.

Example:
	{ "showLocationName": true, "showLocationAddendum": false, "showStoryTime": true, "showStoryScore": false, "showStoryTurn": false }

	This data will be contained in fyrevm.statusLineContent in the browser.