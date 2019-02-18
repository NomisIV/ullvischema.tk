# Ullvischema

Ullvischema is a schedule generator for Ullvigymnasiet in Köping Sweden. It is using [NovaSoftwares' schedule generator](http://www.novasoftware.se/WebViewer/(S(cgwqhhuyvs52nt45qud0zxun))/design1.aspx?schoolid=55860), but it displays the schedule more user-friendly.

## How Ullvischema works

The first time you open Ullvischema on a new unit, you will be redirected to the /new-page where you "register". By selecting your class and your name Ullvischema can map your identity to a unique tag from a list i "stole" from NovaSoftware. (I copied a list from their website's source code.) The tag, as well as the personal ID-number of the student, can be passed as a variable to their schedule generator, which then returns the schedule.

## What Ullvischema does better

* Instead of having to scroll through an enourmous list of students everytime the user refreshes the page, Ullvischema stores the tag in the websites localStorage so that the user only have to enter it once.
* Instead of having an enourmous list for the user to scroll through, Ullvischema splits the list up and sorts students by their class.
* Instead of only showing the week-schedule, Ullvischema uses both the week-schedule and day-schedule and choses which format suits the best according to the aspect ratio of the browser window.
* Instead of chosing which week you want to see, Ullvischema has an integrated datepicker that helps the user chose the right week / day.
* Instead of having to scroll through the enourmous list of students to find a frined's schedule, Ullvischema supports multiple profiles to easily switch between schedules.