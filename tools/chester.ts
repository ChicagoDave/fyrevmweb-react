/*
 * chester.ts - A typescript tool to test channel output from a fyrevm-enabled glulx story file...
 */

// Written in 2016 by David Cornelson
// To the extent possible under law, I have dedicated all copyright and related and neighboring rights
// to this software to the public domain worldwide. This software is distributed without any warranty.
// http://creativecommons.org/publicdomain/zero/1.0/

/// <reference path='node_modules/glulx-typescript/dist/Engine.ts' />
/// <reference path='node_modules/glulx-typescript/node/node-0.11.d.ts' />

/*
 * Operations
 *
 * default:                                 chester.js story.ulx > results.txt
 * ignore untested channels:                chester.js -i story.ulx > results.txt
 * report all channels without testing:     chester.js -a story.ulx > results.txt
 * create testInfo.json for given story:    chester.js -c story.ulx walkthrough.txt(*) > testInfo.json
 * create html report:                      chester.js -h story.ulx > results.html
 *
 * (*) walkthrough.txt is in the following form:
 *
 * (start): d; n; s; e; w; :fork
 * (f): n; get sword; s; kill troll; :goto(after-troll)
 * (f): kill troll
 * (f): e; get knife; w; kill troll; :goto(after-troll)
 * (after-troll): u; n; xyzzy
 *
 * 'default' Logic
 *
 * Attempt to load story.ulx in Engine
 * If an error occurs, report and end with -1
 * Retrieve channels from loaded story
 * Attempt to read channel 'TEST'
 * If channel does not exist, report and end with -2
 * Validate TEST channel contents with json schema
 * If validation fails, report and end with -3
 * Read TEST object into memory
 * For each test script:
 *     Load story file
 *     Retrieve channel data
 *     Compare results on channels for turn: 0 (load results) and report
 *     For each command in script:
 *         Determine if forked script:
 *         If Forked:
 *             Save story file
 *             For each forked script:
 *                 Load story file
 *                 For each command in script:
 *                     Execute command
 *                     Retrieve channel data
 *                     Compare results on channels for turn: x and report
 *                 Next
 *             Next
 *         Else:
 *             Execute command
 *             Retrieve channel data
 *             Compare results on channels for turn: x and report
 *         End-If
 *     Next
 * Next
 *
 */


module Chester {

    

}