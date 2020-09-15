---
layout: post
title: "Compiler Enforced Best Practices"
date: 2020-09-13 21:31:00 -07:00
categories: 'programming'
---

The other day, I was working on a project in ASP.NET MVC Core. I added a field to a model I was trying to pass into a view, which got created by a `CreateModel` function. The create factory function  would take a lot of arguments, then use them to decide which subclass to return. Before my edits, this function had grown to take 16 parameters. This obviously is not great, but this was for a quick bugfix and I hadn't allocated enough time to do a refactor of my controller, so I figured: what's one more parameter?

I was able to fix the bug, but this model factory was mocked and I hadn't updated the mock implementation yet to provide the extra parameter. Our project was using Moq, so we had it mocked out something like this:

```c#
myModelFactory.Setup(x => x.Create(
    It.IsAny<string>(),
    It.IsAny<int>(),
    It.IsAny<bool>(),
    It.IsAny<SomeClass>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>()))
        .Returns(
            (string parameter1,
            int parameter2,
            bool parameter3,
            SomeClass parameter4,
            string parameter5,
            string parameter6,
            string parameter7,
            string parameter8,
            string parameter9,
            string parameter10,
            string parameter11,
            string parameter12,
            string parameter13,
            string parameter14,
            string parameter15,
            string parameter16) =>
            {
                return new MyModel(parameter1, parameter2, ...);
            }
        )
```

I added the 17th parameter to the `.Setup()` call and the `.Returns()` call. Suddendly, I got a mass of red lines in Visual Studio. My project wouldn't build, and the compiler was spitting out the following error: "Cannot convert lambda expression to type 'MyModel' because it is not a delegate type."

What gives?

I wrestled with this for a few hours. The error didn't make any sense: how could it *not* be a delegate type? How could it only be a delegate type once I removed the extra parameter?

The answer ended up being that the `.Returns()` function has several overloads, and some of them are the `Func<Type1, Type2, ..., TResult>` set of objects. Looking at [the .NET API documentation](https://docs.microsoft.com/en-us/dotnet/api/system.func-17?view=netcore-3.1), there are only definitions for `Func` with up to 16 generics associated to parameters. Since I was adding a 17th parameter, there was a type mismatch.

So, I ended up having to do the refactoring I was trying to avoid. Long story short, don't put off code cleanup, or else the compiler will punish you.