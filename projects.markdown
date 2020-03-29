---
layout: page
title: Projects
permalink: /projects/
---

## Otter

Otter is a member management web application I built for an honors fraternity I belonged to during my time at Penn State University, named after our chapter’s official mascot. It stores information on membership status, rush class information, and big/little brother family trees.

Previously, this information was stored in a set of Microsoft Excel spreadsheets, but I was able to dump the data into this application by converting the spreadsheets to CSVs, then applying a custom parser to load it into Rail’s SQL database.

The application is currently private, but the source code can be found on GitHub [here](https://github.com/DrewHiggins/otter).

![](/assets/img/portfolio/screenshots/otter2.jpeg)

<hr />

## PocketState

PocketState was a cross-platform, hybrid mobile application I developed in the summer between my freshman and sophomore years at Penn State. It served as a utility application for students and visitors to the campus, providing a map directory, GPA calculator, and aggregated news feed powered by a custom backend JSON API.

The application was built using the Ionic framework and Angular 1, and the backend was built using Node.js + Express and MongoDB to store the current state of the news feed as well as location data for all of the campus points of interest.

The news feed was updated by a cron job that would run hourly and fire a script to grab the latest headlines from Onward State, the Collegian, and StateCollege.com RSS feeds, parse them, then store them in the database.


<div style="display: flex; justify-content: space-around;">
    <img src="/assets/img/portfolio/screenshots/pocketstate1.png" style="flex: 0; height: 350px;" />
    <img src="/assets/img/portfolio/screenshots/pocketstate2.png" style="flex: 0; height: 350px;" />
</div>

At its peak, the app had over 500 users on iOS and Android. However, about a year after its release, it became defunct due to my unwillingness to re-subscribe to the iOS developer program for $100/year.

<hr />

## AutoTame for Bukkit

Bukkit was a general purpose plugin framework for Minecraft servers a few years ago, before it got shutdown due to a DMCA notice. During it’s time as the go-to server program for the game, I made a couple small plugins to fulfill user requests on their message boards.

One of the plugins I made was called AutoTame, and it would simply the process of a player taming a wolf. Normally, this could be a tedious process, and one server administrator wanted the ability for players to be able to tame the nearest wolf, and be able to customize its collar color and other options, and my plugin did exactly that.

With Bukkit being defunct, the source code for my plugin is fairly useless. However, if you’d like to view it, you can do so here. I also wrote a blog post when I made it with more info, which can be found [here](/2014/08/02/autotame-for-bukkit.html).

![](/assets/img/portfolio/screenshots/autotame2.png)

