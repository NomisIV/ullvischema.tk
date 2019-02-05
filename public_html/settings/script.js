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
    document.getElementById(localStorage.sec || "true").checked = true;
    const list = document.getElementById("profiles");
    for (const user in users) {
        let li = document.createElement("li");
        li.id = user;
        li.innerHTML = user;

        let btn = document.createElement("input");
        btn.type = "button";
        btn.className = "button-delete";
        btn.value = "Delete";
        btn.setAttribute("onclick", "removeProfile('" + user + "')");
        li.append(btn);

        list.append(li);
    }
}

function removeProfile(name) {
    users[name] = undefined; 
    let list = document.getElementById("profiles");
    for (const n in Array.from(list.childNodes)) {
        if (list.childNodes[n].id == name) list.removeChild(list.childNodes[n]);
    }
}

function submit() {
    localStorage.users = JSON.stringify(users);
    localStorage.sec = getRadioValue(document.getElementsByName("seconds")).id;

    window.location.href = "../";
}