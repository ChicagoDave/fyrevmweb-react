# fyrevm-web

Inform 7 tools, projects, and extensions that provide support for web-based Channel IO stories.

## Extensions

### FyreVM Core (required)

Core FyreVM extension required for all glulx-typescript stories. This enables the following default channels:

    {   "MAIN": "\nTrucks flow in and out of the docking area, picking up stacks of bound copies of the IF Press Gazette.\n\n\n",
        "PRPT": ">",
        "LOCN": "Dock",
        "SCOR": "0",
        "TIME": "541",
        "TURN": "2",
        "INFO": "{  storyTitle: \"Stop the IFPress!\",
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

Enables the author to add a prologue in a new channel, "PLOG".

    Example:
    {   "MAIN": "\nStop the IFPress!\nAn IF Press Demonstration by David Cornelson\nRelease 1 / Serial number 160421 / Inform 7 build 6L38 (I6/v6.33 lib 6/12N) SD\n\nAmidst the cavernous warehouse are large printing presses, large rolls of paper, and barrels of ink. Men and women scurry about, putting tomorrow's edition of the IF Press Gazette together. The loading dock is to the north while the offices are to the south.\n\n",
        "PLOG": "During the Great Underground Industrial Revolution, immediately following the disappearance of magic, the IF Press Gazette was created to make up for the lost tradition of the New Zork Times. Even without magic, some things seemed to get done in magical ways...\n",
        "PRPT": ">",
        "LOCN": "Dock",
        "SCOR": "0",
        "TIME": "540",
        "TURN": "1",
        "INFO": "{  storyTitle: \"Stop the IFPress!\",
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

## Tools

### Chester

Command line utility to run FyreVM stories. See chester directory for more information.