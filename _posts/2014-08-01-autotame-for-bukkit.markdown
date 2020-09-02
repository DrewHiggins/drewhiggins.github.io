---
layout: post
title: AutoTame for Bukkit
date: 2014-08-01 20:00:00.000000000 -04:00
categories: ['programming', 'projects']
---


I’ve recently been crawling [Bukkit’s “Plugin Request” forum](http://forums.bukkit.org/forums/plugin-requests.13/) to find some plugin ideas and sharpen up my Java skills, and yesterday, I made one. It’s a simple plugin called AutoTame, and it was suggested by user [roumen4](http://forums.bukkit.org/threads/auto-tame-wolfes.297715/#post-2707838).

Here’s the basic idea for the plugin: whenever a user spawns a wolf with a spawn-egg, the plugin will automatically tame the wolf and set its owner as the player who used the spawn egg.

Here we have an open patch of area:  
![](http://i.imgur.com/mmSMusB.png)

And when we spawn a wolf, he is automatically tamed to the closest player:  
![](http://i.imgur.com/UuGh6KW.png)

We can change his collar color with `/collar <color/random>` (random picks a random color)  
![](http://i.imgur.com/THQkr70.png)![](http://i.imgur.com/I0eA9Nl.png)

And if we die (and config.yml is set to do so), our wolves die too:  
![](http://i.imgur.com/bD7CftS.png)

That’s about it! If you want to get the plugin JAR, you can download it [here](http://dev.bukkit.org/bukkit-plugins/autotame/). You can [get the source on GitHub](https://github.com/DrewHiggins/AutoTame/) as well.
