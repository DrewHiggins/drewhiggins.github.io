---
layout: post
title: PocketState
img: "assets/img/portfolio/pocketstate.jpg"
date: 9 August 2015
tags: [iOS, Android, Ionic, Angular 1.x, Express, Node.js]
---

PocketState was a cross-platform, hybrid mobile application I developed in the 
summer between my freshman and sophomore years at Penn State. It served as a 
utility application for students and visitors to the campus, providing a map 
directory, GPA calculator, and aggregated news feed powered by a custom backend
JSON API.

The application was built using the Ionic framework and Angular 1, and the
backend was built using Node.js + Express and MongoDB to store the current
state of the news feed as well as location data for all of the campus points of
interest.

The news feed was updated by a cron job that would run hourly and fire a script
to grab the latest headlines from Onward State, the Collegian, and
StateCollege.com RSS feeds, parse them, then store them in the database.

At its peak, the app had over 500 users on iOS and Android. However, about a 
year after its release, it became defunct due to my unwillingness to
re-subscribe to the iOS developer program for $100/year.

<a href="/assets/img/portfolio/screenshots/pocketstate1.png">
    <img width="300" src="/assets/img/portfolio/screenshots/pocketstate1.png" />
</a>
<a href="/assets/img/portfolio/screenshots/pocketstate2.png">
    <img width="300" src="/assets/img/portfolio/screenshots/pocketstate2.png" /> 
</a>
<a href="/assets/img/portfolio/screenshots/pocketstate3.png">
    <img width="300" src="/assets/img/portfolio/screenshots/pocketstate3.png" />
</a>