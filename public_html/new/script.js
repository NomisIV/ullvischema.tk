function update() {
    if (localStorage.version != 5.3 && localStorage.users) {
        alert("Ullvischema has recently moved to another server, and unfortunately the localStorage has changed. This means that the tag used prevoiusly doesn't work anymore. However, I got rid of that ugly webhost-banner at the bottom of the website.");
        localStorage.version = 5.3;
    }
}

let students;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        students = JSON.parse(xhttp.responseText);
    }
};
xhttp.open("GET", "../students.json", false);
xhttp.send();

for (const class_name in students) {
    let opt = document.createElement("option");
    opt.value = class_name;
    opt.innerHTML = class_name;
    document.getElementById("class_list").append(opt);
}

function getNameList() {
    document.getElementById("name_list").disabled = false;

    let class_name = document.getElementById("class_list").value;

    var name_list = document.getElementById("name_list");
    while (name_list.lastChild.innerHTML != "Name") {
        name_list.removeChild(name_list.lastChild);
    }
    
    const users = JSON.parse(localStorage.users || "{}");
    for (const name in students[class_name]) {
        let exists = false;
        for (const u in users) {
            if (u == name) exists = true;
        }
        
        let opt = document.createElement("option");
        if (exists) opt.disabled = true;
        opt.value = name;
        opt.innerHTML = name;
        document.getElementById("name_list").append(opt);
    }
}

function activateSubmitButton() {
    document.getElementById("submit").disabled = document.getElementById("name_list").value == "not chosen";
}

function submit() {
    const class_name = document.getElementById("class_list").value;
    const name = document.getElementById("name_list").value;
    const tag = students[class_name][name];
    
    let users = JSON.parse(localStorage.users || "{}");
    users[name] = tag;
    localStorage.users = JSON.stringify(users);
    
    window.location.href = "../";
}