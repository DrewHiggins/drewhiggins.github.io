---
layout: post
title: "The Derek Zoolander School for College Kids Who Can't Database Good"
date: 2018-03-19 23:22:32 -04:00
tags: programming
---

One of the most useful classes I took during my time here at Penn State was
CMPSC 431W: Database Management Systems. Amazingly, this is one of two classes
offered by the CS department here on databases, and it is not required to 
graduate. The only required class isn't a database class, but a Java 
programming class that teaches students about basic SQL since one of your 
projects uses JDBC to connect to an extremely rudimentary database and requires
basic knowledge of implicit joins and creating tables with a GUI. So, for a 
while, I thought databases were easy and once you knew how to type `SELECT ...
FROM ... WHERE ...;` you knew all that a non-DBA needed to know about them.

When I took 431W, I was told by past students that the class has you build a 
basic web application with PHP or something and then hook it up to a database to
display a list of data on a page, like video games or food and you learn that if 
you change the content of the database tables, the list changes (wow!). However, 
when I got to the class, the instructor was different and we had a new project: 
design a database for a specific use case (nurses in a hospital) and then 
implement a simplified relational database management system ((R)DBMS, like a 
MySQL or MariaDB) in C to run the SQL code you wrote to create and query this
database. 

Certainly a taller order than the previous semesters had led me to believe.

<img src="/assets/img/post-images/northbeach.JPG" 
    style="float: right; padding-left: 10px;"
    width="325"
    data-role="presentation" />

So I went through the semester and learned all about how DBMSs work and the
general algorithms behind performing SELECTs and JOINs and how there is 
infuriatingly no right way&trade; of doing things in the world of structuring a
database. And while I learned that database administrator was an entry that I 
would strike off my list of desired careers, I also learned a *lot* about making
database code more efficient and what would be useful for a developer to know as
well as what you could probably get away without knowing. Here's a simple list 
the major takeaways I got from the course, in case your CS department overlooks
this stuff, like Penn State's does.

## Where does the data come from?
There's really only two ways to store data on a computer: memory and the disk,
and since databases store very large amounts of data, they opt for the disk. A 
DBMS essentially keeps track of its records across files, then pulls the data
out of the files and into memory for you when you need them. Now, it could just
use the filesystem management built into the operating system and rely on the OS
to manage its in-memory pages, but databases work differently than most other 
file use cases, so DBMSs re-implement their own paging algorithms. You don't
have to know how they work, just that it's not literally using plain old file
operations. Also, this is an oversimplification of how everything works aimed
at showing how you could write a very simple DBMS, not how production code for
any commercial SQL database software works.

Database tables are stored in a flat binary list of records, which are of fixed
length. The record length is known since the columns in a relational database
table are of a fixed type with an assigned length, hence why you have to declare
a VARCHAR length, for instance. So, if you had a table of students with columns
`fname` of type `VARCHAR(10)`, `lname` of type `VARCHAR(25)`, `age` of type
`INTEGER` and `student_id` of type `CHARACTER(10)`, then you would know that
&mdash;assuming characters are 1 byte and integers are 4 bytes&mdash;that each
record has a total length of 10+25+4+10=49 bytes and that the first 10 bytes of 
the record corresponds to `fname` and so on. 

Keeping with this example, when you type a `SELECT` statement, you can move
record by record until you match the `WHERE` conditions (knowing where to look 
by the byte offset), then return the corresponding record(s). Again, this is a 
very simplified look at things, but hopefully can tell you a bit about what goes
on under the hood.

## How Should I Structure My Data?
Designing your data model is a very complicated process with no correct answers
and a lot of trade-offs, and is totally dependent on your situation. However, if
you want a collection of hard and fast rules on how your tables should be laid 
out, you most likely want to fit the database normalization forms. There are a
lot of form orders, but you pretty much never need to go past third normal form
(3NF).

### First Normal Form (1NF)
Let's say you are storing a list of customers in a database, specifically their
first and last names and their phone numbers (and an ID column that is the PK).
At first nothing seems wrong with this design, and you can add a few customers
with their respective information:

| First Name | Last Name |  Phone Number  |
| ---------- | --------- | -------------- |
| Dale       |  Cooper   | (798)-456-7910 |
| Audrey     |   Horne   | (465)-867-5309 |
| Harry      |  Truman   | (832)-483-0929 |

However, now we have to add Bobby Briggs, who's a wonderful guy, but he recently
signed up for cable or internet with Comcast or something and they threw in a
free landline and hey, who doesn't want a free landline? So now he has two phone
numbers and wants to provide both, but you only have one phone number column, so
you just serialize it as two numbers, comma-separated. Now you have this:

| First Name | Last Name |         Phone Number          |
| ---------- | --------- | ----------------------------- |
| Dale       | Cooper    | (798)-456-7910                |
| Audrey     | Horne     | (465)-867-5309                |
| Harry      | Truman    | (832)-483-0929                |
| Bobby      | Briggs    | (383)-284-3892,(203)-382-1121 |

That new cell in the bottom right is not compliant with 1NF; it's bad database
design, since now if you wanted to query for customers with the phone number
(203)-382-1121, it wouldn't return anyone, since Bobby's "phone number" is seen
by the DBMS as "(383)-284-3892,(203)-382-1121," which is not equivalent. If you
want it to work as intended, you have to write a `LIKE` SQL query and have your
application code handle parsing the results and make sure the developer 
intimately knows the table structure so that they also write all of *their*
applications to do this too, and it just turns into a big mess.

Put simply, first normal form requires that each table cell is *atomic*, holding
only a single piece of data that isn't serialized and doesn't mean anything
other than what it says. To make our example comply with 1NF, you could split
the "Phone Number" column into "Mobile Phone Number" and "Home Phone Number,"
for example. 

### Second Normal Form (2NF)
A table is in second normal form (2NF) if all of its non-key columns are 
dependent on the primary key and no other candidate key. Essentially, this means
that for any row in the  table, if I want to know a non-key column value, I 
*have* to know the PK value and can't rely on any other column (or set of
columns) that is unique for every row.

For example, let's say we have a table of big-wigs at tech companies in a table:

|   Name (PK)   |  Company   |  Position  |   Location    |
| ------------- | ---------- | ---------- | ------------- |
| Satya Nadella | Microsoft  | CEO        | Redmond, WA   |
| Tim Cook      | Apple      | CEO        | Cupertino, CA |
| Bill Gates    | Microsoft  | Co-Founder | Redmond, WA   |
| Jeff Bezos    | Amazon.com | CEO        | Seattle, WA   |

Here, we see that {Name} is the PK, but the combination {Company, Position}
could also be a PK, and location depends on part of that candidate key,
specifically Company. This is a violation of 2NF. To fix it, break out the table
into 2 tables:

#### People table

|   Name (PK)   | Company (FK) |  Position  |
| ------------- | ------------ | ---------- |
| Satya Nadella | Microsoft    | CEO        |
| Tim Cook      | Apple        | CEO        |
| Bill Gates    | Microsoft    | Co-Founder |
| Jeff Bezos    | Amazon.com   | CEO        |

#### Companies table

| Company Name (PK) |   Location    |
| ----------------- | ------------- |
| Microsoft         | Redmond, WA   |
| Amazon.com        | Seattle, WA   |
| Apple             | Cupertino, CA |

This accomplishes a couple things: firstly, it makes our data returned a bit
cleaner; if we want to know who the CEO of Microsoft is, we should get Satya
Nadella, and if we want more information about him, I can look it up elsewhere
in the database. Second, it removes an unnecessary dependency in our People
table between company and location. Now, if Amazon moves headquarters, we don't
have to update every row with Amazon as the company in the table, we just have 
to update the location in the Companies table and the rest will take care of
itself.

### Third Normal Form (3NF)
Now that we've removed any dependencies on a partial candidate key, we want to
remove any dependencies on any column in the table that isn't the primary key.
This is pretty simple to spot, as shown below, in the table below:

|    Game (PK)    | Winning Team | Winning Team Location |
| --------------- | ------------ | --------------------- |
| Super Bowl XLIX | Patriots     | New England           |
| Super Bowl 50   | Broncos      | Denver                |
| Super Bowl LI   | Patriots     | New England           |
| Super Bowl LII  | Eagles       | Philadelphia          |

Spot the issue? The game name is the primary key (and it is the only candidate
key), but the Winning Team Location column doesn't depend on it or any
candidate key, it only depends on the Winning Team column. That's a 3NF
violation, and we can fix it by moving Teams and Super Bowls into different
tables:

#### Super Bowls 

|    Game (PK)    | Winning Team (FK) |
| --------------- | ----------------- |
| Super Bowl XLIV | Patriots          |
| Super Bowl 50   | Broncos           |
| Super Bowl LI   | Patriots          |
| Super Bowl LII  | Eagles            |

#### Teams

| Team Name (PK) |   Location   |
| -------------- | ------------ |
| Patriots       | New England  |
| Broncos        | Denver       |
| Eagles         | Philadelphia |

Similar to 2NF, we've now removed redundant data from the Super Bowls table,
so if we ever need to change a city associated with a team (say, if they move),
we only have to update it in one place. Makes sense, right? You should always
do this, right?

Right?

Wrong. There are situations where the cleanliness and theoretical perfectness
of these normal forms are outweighed by a practical concern: in a *lot* of
cases, NFL teams are written in the form [City] [Team] (i.e. "Philadelphia
Eagles" is far more common than "Eagles"). In order to get the data out of the
database to display it on, say, a scoreboard, you need to perform a `JOIN`
between the Teams and Super Bowls tables, which is slower than just grabbing the
rows out of the Super Bowls table. And let's be honest, NFL teams moving is
pretty rare, so you can afford to update at most 6 rows in a database if the
Steelers move cities. So, it may make more sense to just keep the location in
the Super Bowls table when it comes to practical performance.

## What in God's name is an index?
The following may be a conversation you may have (or had) at some point during
an internship during your college career (I certainly had it happen at least
once):

*You*: "Gosh, this database is slow!"

*"Real" developer*: "Yeah, maybe we should index this table."

*You*: "Heh yeah, good idea. That might help..."

And then you go do something else (or get the "real" developers coffee, if you
work at a shitty company) because you have not the slightest clue what an index
is, what it does, or how it will make your database calls faster.

<img src="/assets/img/post-images/jellyfish.JPG" 
    style="float: left;"
    width="350"
    data-role="presentation" />

Let's demystify indexes a bit. Remember that database data is stored in files,
and we'll even go so far as to pretend that a DBMS can access all of the data
in memory. So, if there's an array of data and you're searching for any item
that satisfies some condition (i.e. a `SELECT...WHERE` clause), you could 
perform a linear search if the data is unsorted since the DBMS has no way of 
guaranteeing that it didn't miss something along the way than checking every 
single row's values, and&mdash;as you learned in CS 101 (or CMPSC 122, for my 
fellow Nittany Lions)&mdash;linear searches are kind of slow since they have, 
well, linear time complexity. And God forbid you want to perform a `JOIN`, then
you'd have nested loops!

The other way you could search the data is by taking your flat data and putting
it in some sort of data structure, then using a more efficient searching
algorithm on that structure to find what you're looking for in sub-linear time.
The process of putting the data from a table into one of these data structures
is exactly what indexing is. 

For example, if we have a table of students with columns for their student ID
numbers (the primary key), first name, last name, and starting year, then our
table would be sorted by student ID number, since that's the primary key. And
that's all well and good until someone wants to write a web application for TAs
to enter grades by last name rather than ID number because its more convenient.
At that point, it would make sense for you to index the table. When you do, the 
DBMS makes a table that is sorted by last name and has mappings for each row of
the form (last name => student ID). Now we can find the info for a student by
finding their last name in the index table, then finding the corresponding entry
to the primary key in the original table, and just like that our search is
executed in *log(n)* time.

This is a rudimentary example, and real DBMSs have a plethora of data structures
that they can make indexes from. Two of the most popular indices are hashes and
[B+ trees](https://en.wikipedia.org/wiki/B%2B_tree), and they both have
different use cases. Are you checking for equality, looking for one specific
row? A hashmap may work best. Looking for a range of values with more relative
comparators? A B+ tree should do the trick.

### Index all the things?
So right about now indexes are probably looking pretty damn sweet. In fact, you
might be tempted to index everything in every database you ever make. Do not do
this. Indexes (or indices, I don't know which is correct) do speed up reads
pretty significantly, but they also slow down writes. Why? Well, since they are
essentially copying a subset of their table's columns, they have to be updated 
(and sorted!) whenever a new row is added to the table or a row is updated that
involves the columns being indexed. 

In our example above, every new student would have to be inserted into both the
original table and the index, and not only that, but inserted into the correct
place in the index, since the data is sorted. Now, since students are only
inserted rarely (twice a year, say) but read far more often, this may be a good
trade-off to make. But, it's something to think about.

That, right there, is the biggest takeaway I had from my databases class: data
model design is less about what the best way of doing something is and more
about what the best way of doing it *given the current situation* is. If you
learned one thing from this post, I hope that's it.

And if that sounds horrible, then I hope you&mdash;like me&mdash;also learned
that being a database administrator is not your calling.