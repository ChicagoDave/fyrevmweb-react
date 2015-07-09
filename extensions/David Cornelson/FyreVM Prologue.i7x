FyreVM Prologue by David Cornelson begins here.

Include FyreVM Core by David Cornelson.

[
  This extension is for Glulx+Channel IO stories.

  It adds a new channel, "prologue" and on the first turn sends the text in the prologue channel.
]

Section 1 - Definitions

Include (- Constant FYC_PROLOGUE = ('P' * $1000000) + ('L' * $10000) + ('O' * $100) + 'G'; -);

Section 2a - Not For Release

To Select the Prologue Channel:
	(- if (is_fyrevm) FyreCall(FY_CHANNEL, FYC_PROLOGUE); else print "** Prologue channel ON **^";  -);

Section 2b - For Release Only

To Select the Prologue Channel:
	(- if (is_fyrevm) FyreCall(FY_CHANNEL, FYC_PROLOGUE); -);

FyreVM Prologue ends here.

---- DOCUMENTATION ----

FyreVM Prologue adds a prologue channel giving the author a method to write prologue text.

The author should add the following code to their game file:

	When play begins while outputting channels (this is the prologue channel rule):
		select the prologue channel;
		say "This is the prologue.";
		select the main channel.
