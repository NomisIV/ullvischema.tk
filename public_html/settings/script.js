// Darkmode
function darkmode() {
    document.body.style.backgroundColor = localStorage.darkmode == "true" ? "#262626" : "#ffffff";
    document.body.style.color = localStorage.darkmode == "true" ? "#d9d9d9" : "#333333";
}

let users = JSON.parse(localStorage.users);

function getRadioValue(radio_group) {
    for(let n = 0; n < radio_group.length; n++) {
        if(radio_group[n].checked) {
            return radio_group[n];
        }
    }
    return undefined;
}

function getSettings() {
    // Users
    const list = document.getElementById("profiles");
    for (const user in users) {
        let li = document.createElement("li");
        li.id = user;
        li.innerHTML = user;
        
        let btn = document.createElement("input");
        btn.type = "button";
        btn.className = "delete";
        btn.value = "Delete";
        btn.setAttribute("onclick", "removeProfile('" + user + "')");
        li.append(btn);
        
        list.append(li);
    }
    
    // Seconds in clock
    document.getElementById("seconds").checked = localStorage.sec == "false" ? false : true;
    
    // Hairline
    document.getElementById("hairline").checked = localStorage.hairline == "true" ? true : false;
    
    // Dark mode
    document.getElementById("darkmode").checked = localStorage.darkmode == "true" ? true : false;
    
    // Theme
    const theme = document.getElementById("theme");
    const themes = 8;
    for (let n = 0; n < themes; n++) {
        const opt = document.createElement("option");
        theme.append(opt);
        opt.value = n * 360 / themes;
        opt.innerHTML = "Theme " + (n + 1);
    }
    theme.value = localStorage.theme ? localStorage.theme : "0";
    // TODO: Add random theme
}

function removeProfile(name) {
    users[name] = undefined; 
    let list = document.getElementById("profiles");
    for (const n in Array.from(list.childNodes)) {
        if (list.childNodes[n].id == name) list.removeChild(list.childNodes[n]);
    }
    submit();
}

function submit() {
    localStorage.users    = JSON.stringify(users);
    localStorage.sec      = document.getElementById("seconds") .checked;
    localStorage.hairline = document.getElementById("hairline").checked;
    localStorage.darkmode = document.getElementById("darkmode").checked;
    localStorage.theme    = document.getElementById("theme")   .value;
}