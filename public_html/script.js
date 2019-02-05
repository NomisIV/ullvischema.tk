Date.prototype.getWeekNumber = function() {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
};

function prev() {
    let d = new Date($("#datepicker").datepicker("getUTCDate"));
    let n;
    if (window.innerHeight > window.innerWidth * Math.sqrt(2)) {
        n = new Date(d.setDate(d.getDate() - 1)); //Minus a day
    } else {
        n = new Date(d.setDate(d.getDate() - 7)); //Minus a week
    }
    $("#datepicker").datepicker("setUTCDate", n);
    schedule();
}

function next() {
    let d = new Date($("#datepicker").datepicker("getUTCDate"));
    let n;
    if (window.innerHeight > window.innerWidth * Math.sqrt(2)) {
        n = new Date(d.setDate(d.getDate() + 1)); //Plus a day
    } else {
        n = new Date(d.setDate(d.getDate() + 7)); //Plus a week
    }
    $("#datepicker").datepicker("setUTCDate", n);
    schedule();
}

const d = new Date();

// Uncomment when outside beta
//localStorage.id = undefined;
let users = JSON.parse(localStorage.users || "{}");
if (users[0]) {
    alert("Due to a change in the data-structure, and me being to lazy to write a translating algorithm, I ask you to press OK and select your class and name again. This is unfortunate, and I hope nothing like this will happen again in the future. However this is to expect using the beta version, as it is yet not finalized. One step backwards leads to two steps forwards. Thank you for your patience.");
    localStorage.users = "";
    window.location.href = "new";
}
if (Object.keys(users).length == 0) window.location.href = "new";

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

    let d = new Date($("#datepicker").datepicker("getUTCDate"));

    // WEEK
    let week = d.getWeekNumber();

    // DAY
    let day;
    if (window.innerHeight > window.innerWidth * Math.sqrt(2)) {
        if (d.getDay() == 0 || d.getDay() == 6) {
            day = 1;
            week++;
        }
        else {
            day = Math.pow(2, d.getDay() - 1);
        }
    }
    else {
        // If (weekend) then: next week
        if (d.getDay() == 0 || d.getDay() == 6) {
            week++;
        }

        day = 0;
    }

    let width = window.innerWidth - 16;
    let height = window.innerHeight - 46;

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