# fyrevm-web

Inform 7 tools, projects, and extensions that provide support for web-based Channel IO stories.

## Extensions

### FyreVM Core (required)

Core FyreVM extension required for all glulx-typescript stories. This enables the following default channels:

    fyrevm {
        "mainContent": "\nTrucks flow in and out of the docking area, picking up stacks of bound copies of the IF Press Gazette.\n\n\n"
        "prompt": ">",
        "locationName": "Dock",
        "score": "0",
        "time": "541",
        "turn": "2",
        "storyInfo": "{  storyTitle: \"Stop the IFPress!\",
                    storyHeadline: \"An IF Press Demonstration\",
                    storyAuthor: \"David Cornelson\",
                    storyCreationYear: \"2016\",
                    releaseNumber: \"1\",
                    serialNumber: \"160421\",
                    inform7Build: \"6L38\",
                    inform6Library: \"6.33\",
                    inform7Library: \"6/12N\",
                    strictMode: \"S\",
                    debugMode: \"D\" }"
    }

### FyreVM Banner (optional)

Provides the standard banner for a FyreVM enabled story in a standard Glulx interpreter.

### FyreVM Prologue (optional)

Enables the author to add a prologue in a new channel, "fyrevm.prologueContent".

    Example:
    fyrevm
    {   "mainContent": "\nStop the IFPress!\nAn IF Press Demonstration by David Cornelson\nRelease 1 / Serial number 160421 / Inform 7 build 6L38 (I6/v6.33 lib 6/12N) SD\n\nAmidst the cavernous warehouse are large printing presses, large rolls of paper, and barrels of ink. Men and women scurry about, putting tomorrow's edition of the IF Press Gazette together. The loading dock is to the north while the offices are to the south.\n\n",
        "prologueContent": "During the Great Underground Industrial Revolution, immediately following the disappearance of magic, the IF Press Gazette was created to make up for the lost tradition of the New Zork Times. Even without magic, some things seemed to get done in magical ways...\n",
        "prompt": ">",
        "locationName": "Dock",
        "score": "0",
        "time": "540",
        "turn": "1",
        "storyInfo": "{  storyTitle: \"Stop the IFPress!\",
                    storyHeadline: \"An IF Press Demonstration\",
                    storyAuthor: \"David Cornelson\",
                    storyCreationYear: \"2016\",
                    releaseNumber: \"1\",
                    serialNumber: \"160421\",
                    inform7Build: \"6L38\",
                    inform6Library: \"6.33\",
                    inform7Library: \"6/12N\",
                    strictMode: \"S\",
                    debugMode: \"D\" }"
    }

## Projects

### Stop the IFPress!

Simple I7 story with FyreVM extensions enabled.

### Cloak of Darkness

Full implementation of fyrevm-web using JavaScript in a simple HTML page.

## Road Map

### Cloak of Darkness (standard template)

* Add scrolling main content
* Add web menu for help, hints, settings, and about
* Support undo
* Support transcripts

### Cloak of Darkness (paging template)

* Add paging main content
* Support full paging control (page back/forward, jump to page)
* Support branching
* Support high-end design
