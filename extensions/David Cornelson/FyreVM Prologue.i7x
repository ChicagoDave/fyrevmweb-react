FyreVM Prologue by David Cornelson begins here.

prologue-channel is a channel with content name "prologueContent" and content type "text".
	
To select the prologue channel:
	select prologue-channel.

FyreVM Prologue ends here.

---- DOCUMENTATION ----

FyreVM Prologue adds a prologue channel giving the author a method to write prologue text.

The author should add the following code to their game file:

	When play begins (this is the prologue channel rule):
		select the prologue channel;
		say "This is the prologue.";
		select the main channel.
