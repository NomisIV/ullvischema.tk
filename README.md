# Ullvischema

![Netlify](https://img.shields.io/netlify/b3d67ed9-1115-40cb-908b-a131677a3d68)
![GitHub language count](https://img.shields.io/github/languages/count/NomisIV/ullvischema.tk)
![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/NomisIV/ullvischema.tk)
![Code Climate issues](https://img.shields.io/codeclimate/issues/NomisIV/ullvischema.tk)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/NomisIV/ullvischema.tk)

Ullvischema is a schedule generator for Ullvigymnasiet in Köping Sweden. It is using [NovaSoftwares' schedule generator](<http://www.novasoftware.se/WebViewer/(S(cgwqhhuyvs52nt45qud0zxun))/design1.aspx?schoolid=55860>), but it displays the schedule in a more more user-friendly way.

## How Ullvischema works

The first time you open Ullvischema on a new unit, you will be redirected to the /new-page where you "register". By selecting your class and your name Ullvischema can map your identity to a unique tag from a list I "stole" from NovaSoftware. (I copied a list from their website's source code.) The tag, as well as the personal ID-number of the student, can be passed as a variable to their schedule generator, which then returns the schedule.

## What Ullvischema does better

* Instead of having an enourmous list for the user to scroll through everytime the user refreshes the page, Ullvischema stores the tag in the website's localStorage so that the user only have to enter it **once**.
* Instead of having an enourmous list for the user to scroll through, Ullvischema splits the list up and sorts students by their class.
* Instead of having an enourmous list for the user to scroll through to find a frined's schedule, Ullvischema supports multiple profiles to easily switch between schedules.
* Instead of only showing the week-schedule (even though the schedule generator is capable of more), Ullvischema uses both the week-schedule and day-schedule and choses which format suits the best according to the aspect ratio of the browser window.
* Instead of chosing which week you want to see, Ullvischema has an integrated datepicker that helps the user chose the right week / day.
* Ullvischema also uses an experimental hairline to directly indicate time inside the schedule. Unfortunately it does not work on all schedules, since some schedules start and end at different times.
* It uses HTTPS instead of HTTP.
