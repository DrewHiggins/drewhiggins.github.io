---
layout: post
title: Solving an Android CORS Bug
date: 2015-08-05 23:23:54.000000000 -04:00
categories: 'programming'
---
In the course of developing a hybrid app with the [Ionic Framework](http://ionicframework.com), I ran into a strange bug: the app would display data grabbed from a JSON API backend perfectly on my desktop web browser, through the `ionic serve --lab` command, and on the iOS Simulator. But for some strange reason, the space on the Android app where the data was supposed to go was blank on the Android emulator.

After trying a number of fixes on the client side and digging through StackOverflow threads, I finally figured it out: the error was not with the client side code on the app, but rather in my server side Node.js code. My cross-origin resource sharing (CORS) settings were not fully configured, and Android apparently is much more strict about having explicit CORS settings than iOS or Google Chrome. To fix this issue, I installed the `cors` [package with NPM](https://www.npmjs.com/package/cors). Then, in my server side Node.js/Express.js code, I added the following:

{% highlight js %}

    var express = require('express');
var app = express();
var cors = require('cors');

// ...

app.use(cors({  // enables CORS
  credentials: true, 
  origin: true,
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));
{% endhighlight %}

After adding that code, the Android app worked like a charm. I hope this post helps anyone else with this issue!