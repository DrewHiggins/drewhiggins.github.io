---
layout: post
title: Removing the Title Bar from iTerm2
date: 2015-04-03 20:00:00.000000000 -04:00
---


I have recently been trying to learn [Vim](http://en.wikipedia.org/wiki/Vim_%28text_editor%29), and have therefore spent a great deal of time in the OS X terminal app. I soon made the upgrade to iTerm2, but started getting jealous whenever I saw some of the crazy minimalistic terminal pane setups on [/r/unixporn](http://reddit.com/r/unixporn). So I wondered: was there a way to remove the shameful title bar from iTerm2 on OS X like there was on Linux/BSD distros?

The answer is yes. It's a bit involved, but yes. It took me a bit of Googling to figure it out though, so here's a guide.

Firstly, you'll need to grab the source code for iTerm. This can be done with git:

    $ git clone https://github.com/gnachman/iTerm2.git

Then, you'll need to do a tiny modification to the source code. Navigate to the cloned folder, then to the `sources` folder, and then open `PseudoTerminal.m` with your editor of choice.

    $ cd iTerm2/sources
    $ vi PseudoTerminal.m

Find the following switch case:

    default:
		return (NSTitledWindowMask |
			NSClosableWindowMask |
			NSMiniaturizableWindowMask |
			NSResizableWindowMask |
			NSTexturedBackgroundWindowMask);

And remove the `NSTitledWindowMask`

    default:
		return (NSClosableWindowMask |
			NSMiniaturizableWindowMask |
			NSResizableWindowMask |
			NSTexturedBackgroundWindowMask);

Then, change back to the main directory and compile the app.

    $ cd ..
    $ make

There should now be a new `iTerm2.app` file sitting in the `build/Development` folder. Replace the one in your Mac's applications folder with it and voila! You have a beautiful, minimal terminal for your Mac.

![my setup](http://i.imgur.com/5J2QCCp.jpg)
