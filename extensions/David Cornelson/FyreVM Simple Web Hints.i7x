FyreVM Simple Web Hints by David Cornelson begins here.

Include FyreVM Core by David Cornelson.

Table of Hint Categories
visible	catid	title
--	--	--

Table of Hint Questions
visible	catid	qid	description
--	--	--	--

Table of Hints
catid	qid	hid	description
--	--	--	--

hint-channel is a channel with content name "hintContent" and content type "json".

To select the hint channel:
	select hint-channel;

When play begins when outputting channels:
	emit hints.

Every turn when outputting channels:
	emit hints.

To emit hints:
	select the hint channel;
	say "[bracket]";
	let crow be 0;
	repeat through the Table of Hint Categories:
		if visible entry is 1:
			let ccatid be the catid entry;
			if crow is greater than 0:
				say ",";
			say "{ 'id':[catid entry],'title': '[title entry]', 'questions': [bracket] ";
			let qrow be 0;
			repeat through the Table of Hint Questions:
				if visible entry is 1 and catid entry is ccatid: [ visible and in category only ]
					let qqid be qid entry;
					if qrow is greater than 0:
						say ",";
					say "{ 'id': [qid entry], 'question': '[description entry]', 'hints': [bracket] ";
					let hrow be 0;
					repeat through the Table of Hints:
						if catid entry is ccatid and qid entry is qqid:
							if hrow is greater than 0:
								say ",";
							say "{ 'id': [hid entry], 'description': '[description entry]' }";
							now hrow is hrow + 1;
					say "[close bracket] }";
					now qrow is qrow + 1;
			say "[close bracket] }";
			now crow is crow + 1;
	say "[close bracket]";
	select the main channel.
	
FyreVM Simple Web Hints ends here.

---- DOCUMENTATION ----

FyreVM Simple Web Hints is an extension that allows the author to provide Invisiclue like hints to a standard FyreVM web template.

The author needs to create the following tables with their own categories, questions, and hints. Note the visible flag on categories and questions allows the author to manipulate when those items are sent to the user interface. Also note that catid and qid are important for filtering the data properly and emitting the data to a channel. The hint id (hid) isn't used here, but will be used in the user interface for ordering purposes.

Example: * FyreVM Hints for Cloak of Darkness - An example of of simple web hints for the standard FyreVM template.

	*: "FyreVM Hints for Cloak of Darkness"

	Include FyreVM Core by David Cornelson.
	Include FyreVM Simple Web Hints by David Cornelson.

	The story headline is "Hints for Cloak of Darkness".
	The story creation year is 2016.

	The Cloak Room is a room.

	Table of Hint Categories (continued)
	visible	catid	title
	1	1	"Chapter 1 - In the beginning..."
	1	2	"Chapter 2 - In the light...";

	Table of Hint Questions (continued)
	visible	catid	qid	description
	1	1	1	"What do I do with this cloak?"
	1	1	2	"Why is it dark in here?"
	1	2	1	"What is the message on the floor?"

	Table of Hints (continued)
	catid	qid	hid	description
	1	1	1	"Maybe it belongs somewhere."
	1	1	2	"If there were only somewhere to hang it."
	1	1	3	"Hang it on the hook."
	1	2	1	"Do you have a light source?"
	1	2	2	"The light switch is somewhere."
	1	2	3	"The hook in the cloakroom is interesting."
	1	2	4	"After you hang up the cloak, things will get brighter!"
	2	1	1	"Don't go in the bar before hanging up the cloak."
	
	when play begins:
		say "This is the JSON hint data that would be sent on the hint channel in a FyreVM web application.[paragraph break]";
		emit hints;
		say "[paragraph break]";
