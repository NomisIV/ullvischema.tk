Date.prototype.getWeekNumber = function() {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
};

function prev() {
    const d = datepicker.getDate();
    const n = window.innerHeight < window.innerWidth * Math.sqrt(2) ? new Date(d.getTime() - WEEK) : new Date(d.getTime() - DAY);
    datepicker.setDate(n);
}

function next() {
    const d = datepicker.getDate();
    console.log(d);
    const n = window.innerHeight < window.innerWidth * Math.sqrt(2) ? new Date(d.getTime() + WEEK) : new Date(d.getTime() + DAY);
    console.log(datepicker.setDate(n);
}

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
            window.innerHeight < window.innerWidth * Math.sqrt(2) ?
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
    
    // Headern på schemat tar upp ~5.8% av höjden
    
    // TAG
    const tag = document.getElementById("users").value || users[Object.keys(users)[0]];
    
    datepicker.config({
        format: d => {
            return (
                window.innerHeight < window.innerWidth * Math.sqrt(2) ?
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
    if (window.innerHeight > window.innerWidth * Math.sqrt(2)) {
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
    let height = window.innerHeight - 49;

    let url = "http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=55860/sv-se&type=-1&id=" + tag + "&period=&week=" + week + "&mode=0&printer=0&colors=32&head=0&clock=0&foot=0&day=" + day + "&width=" + width + "&height=" + height + "&maxwidth=0&maxheight=0";
    document.getElementById("schedule").src = url;
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
}

function addZero(i) {
    if (i < 10) i = "0" + i; // add zero in front of numbers < 10
    return i;
}