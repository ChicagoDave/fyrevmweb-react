FyreVM Text Styles by David Cornelson begins here.

ui-style is a kind of thing.

[We can load up font-families with an order of font family names.]

link-command is a kind of thing. a link-command has some text called command.

to say ui (U - ui-style) -- beginning say_font -- running on:
	if outputting channels:
		say "<span class=[quotation mark][U][quotation mark]>";
	otherwise:
		say "";

to say /ui -- ending say_font -- running on:
	if outputting channels:
		say "</span>";
	otherwise:
		say "";

to say b -- beginning say_bold -- running on:
	say "<b>".

to say /b -- ending say_bold -- running on:
	say "</b>".

to say i -- beginning say_italics -- running on:
	say "<i>".

to say /i -- ending say_italics -- running on:
	say "</i>".

to say em -- beginning say_emphasis -- running on:
	say "<em>".

to say /em -- ending say_emphasis -- running on:
	say "</em>".

to say strong -- beginning say_strong -- running on:
	say "<strong>".

to say /strong -- ending say_strong -- running on:
	say "</strong>".

[ Common commands ]

go-north is a link-command with command "north".
go-northeast is a link-command with command "northeast".
go-east is a link-command with command "east".
go-southeast is a link-command with command "southeast".
go-south is a link-command with command "south".
go-southwest is a link-command with command "southwest".
go-west is a link-command with command "west".
go-northwest is a link-command with command "northwest".
go-up is a link-command with command "up".
go-down is a link-command with command "down".
go-in is a link-command with command "in".
go-out is a link-command with command "out".

do-inventory is a link-command with  command "inventory".

to say cmdlink (LC - link-command) -- beginning say_link -- running on:
	say "<a href=[quotation mark]#[quotation mark] onclick=[quotation mark]sendCommand([apostrophe][command of LC][apostrophe]);[quotation mark]>";

to say /cmdlink -- ending say_link -- running on:
	say "</a>";

FyreVM Text Styles ends here.

---- DOCUMENTATION ----

FyreVM Text Styles provides standard font and text styling. There are complex styles and inline styles.

Complex styles:
	
	main-style is a ui-style. the color of main-style is Black. the font family of main-style is "Poirot+One". The font-source of main-style is google. the weight of main-style is normal.
	mono-style is a ui-style. the color of mono-style is Blue. the font family of mono-style is "Cousine". The font-source of mono-style is google. the weight of mono-style is normal.
	
	say "[ui main-style]This text will be set in the defined main style.[/ui]";

Simple styles:
	
go-north is a link-command with the command "go north".

	say "[b]This is bold text.[/b]";
	say "[i]This is italics text.[/i]";
	say "[em]This is empasized text.[/em]";
	say "[strong]This is strong text.[/strong]";
	say "[cmdlink go-north]north[/cmdlink]";
	