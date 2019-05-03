function prev() {
    const d = datepicker.getDate();
    const n = sessionStorage.ar > 0.8 ?
        new Date(d.getTime() - WEEK) :
        new Date(d.getDay() > 1 ? d.getTime() - DAY : d.getTime() - 3 * DAY);
    datepicker.setDate(n);
}

function next() {
    const d = datepicker.getDate();
    const n = sessionStorage.ar > 0.8 ?
        new Date(d.getTime() + WEEK) :
        new Date(d.getDay() < 6 ? d.getTime() + DAY : d.getTime() + 3 * DAY);
    datepicker.setDate(n);
}

// Color theme
document.getElementById("schedule").style.filter =
    "hue-rotate(" + localStorage.theme + "deg)" +
    (localStorage.darkmode == "true" ? " invert(0.85)" : "");

localStorage.id = undefined;
let users = JSON.parse(localStorage.users || "{}");
if (Object.keys(users).length == 0) window.location.href = "new";

const datepicker = new Datepicker(document.getElementById("datepicker"));
datepicker.config({
    firstdate: new Date(2019, 0, 9),
    lastdate: new Date(2019, 5, 14),
    disableddays: d => { return (d.getDay() > 0 && d.getDay() < 6); },
    format: d => {
        return (
            sessionStorage.ar > 0.8 ?
                "Week " + d.getWeekNumber() :
                months_short[d.getMonth()] + " " + d.getDate() 
        );
    }
});
datepicker.setDate(new Date());

// User selection
for (const n in users) {
    let opt = document.createElement("option");
    opt.value = users[n];
    opt.innerHTML = n;
    document.getElementById("users").append(opt);
}

// Load schedule
function schedule() {
    
    // TAG
    const tag = document.getElementById("users").value || users[Object.keys(users)[0]];
    
    datepicker.config({
        format: d => {
            return (
                sessionStorage.ar > 0.8 ?
                    "Week " + d.getWeekNumber() :
                    months_short[d.getMonth()] + " " + d.getDate()
            );
        }
    });
    
    const date = datepicker.getDate();
    
    // WEEK
    let week = date.getWeekNumber();

    // DAY
    let day;
    if (sessionStorage.ar <= 0.8) {
        if (date.getDay() == 0 || date.getDay() == 6) {
            day = 1;
            week++;
        }
        else day = Math.pow(2, date.getDay() - 1);
    } else {
        if (date.getDay() == 0 || date.getDay() == 6) week++;
        day = 0;
    }

    let width = window.innerWidth - 16;
    let height = window.innerHeight - 50;

    document.getElementById("schedule").src = "http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=55860/sv-se&type=-1&id=" + tag + "&period=&week=" + week + "&mode=0&printer=0&colors=32&head=0&clock=0&foot=0&day=" + day + "&width=" + width + "&height=" + height + "&maxwidth=0&maxheight=0";
} schedule();

//Hairline
function hairline() {
    if (localStorage.hairline == "true") {
        const date = datepicker.getDate();
        
        let line;
        if (document.getElementById("hairline") == undefined) {
            line = document.createElement("div");
            document.body.append(line);
            line.id = "hairline";
        } else line = document.getElementById("hairline");
        
        let time = new Date();
        
        if (
            time.getWeekNumber() == date.getWeekNumber() && // If current week
            time.getDay() - 1 < 5 && // If weekday
            time.getHours() * 100 + time.getMinutes() > "820" && // After 08:20
            time.getHours() * 100 + time.getMinutes() < "1530" // Before 15:30
        ) {
            line.style.display = "initial";
            
            let width = window.innerWidth - 17;
            let height = window.innerHeight - 49;
    
            let line_width = Math.floor(width / 5);
            line.style.width = (sessionStorage.ar < 0.8 ? width : (line_width - (time.getDay() == 3 ? 1 : 0))) + "px";
    
            let time_factor = ((time.getHours() - 8) * 60 + time.getMinutes() - 20) / 430;
            line.style.top = 42 + height * 0.0555 + time_factor * (height * 0.9445 - 1) + "px";
            line.style.left = (sessionStorage.ar < 0.8 ? 8 : Math.floor(8 + (time.getDay() - 1) * line_width)) + "px";
        } else line.style.display = "none";
        setTimeout(hairline, 1000);
    }
}

// Clock
function getTime() {
    let t = new Date();

    let h = t.getHours();
    let m = t.getMinutes();
    let s = t.getSeconds();

    // Refresh if midnight
    if (h == 0 && m == 0 && s == 0) {
        schedule();
    }
    
    function addZero(i) {
        if (i < 10) i = "0" + i; // add zero in front of numbers < 10
        return i;
    }

    m = addZero(m);
    s = addZero(s);

    let sec = localStorage.sec || "true";
    if (sec == "true") {
        document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
    }
    else {
        document.getElementById("clock").innerHTML = h + ":" + m;
    }
    setTimeout(getTime, 100);
} getTime();

window.onresize = () => {
    sessionStorage.ar = (window.innerWidth / window.innerHeight).toFixed(1);
    schedule();
    return (sessionStorage.ar);
}; window.onresize();

document.onfocus = schedule;