FyreVM Banner Output by David Cornelson begins here.

Section 1 - Print the Banner when not using channels

Rule for printing the banner text when not outputting channels:
	say "[bold type][story title][roman type][line break]";
	say "[story headline] by [story author][line break]";
	say "Copyright [unicode 169] [story creation year][line break]";
	say "Release [release number] / Serial number [story serial number] / Inform 7 Build [I7 version number] (I6 lib/v[I6 library number] lib [I7 library number] [strict mode][debug mode])[line break]";

Section 2 - Banner channel for putting the banner somewhere else

banner-channel is a channel with content name "bannerContent" and content type "text".

Rule for printing the banner text when outputting channels:
	say "[on banner-channel][bold type][story title][roman type][line break][story headline] by [story author][line break]Copyright [unicode 169] [story creation year][line break]Release [release number] / Serial number [story serial number] / Inform 7 Build [I7 version number] (I6 lib/v[I6 library number] lib [I7 library number] [strict mode][debug mode])[line break][end]";

FyreVM Banner Output ends here.

---- DOCUMENTATION ----

The FyreVM Banner Output extension prints the standard I7 banner when not emitting channel data (in the IDE or a non quixe-channels interpreter).