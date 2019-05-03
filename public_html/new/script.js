// Darkmode
function darkmode() {
    document.body.style.backgroundColor = localStorage.darkmode == "true" ? "#262626" : "#ffffff";
    document.body.style.color = localStorage.darkmode == "true" ? "#d9d9d9" : "#333333";
}

// Get list of students from server
let students;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        students = JSON.parse(xhttp.responseText);
    }
};
xhttp.open("GET", "/assets/students.json", false);
xhttp.send();

// Put every class in class_list
for (const class_name in students) {
    let opt = document.createElement("option");
    opt.value = class_name;
    opt.innerHTML = class_name;
    document.getElementById("class_list").append(opt);
}

// Get every student in selected class
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

// Activate submit button when student is chosen
function activateSubmitButton() {
    document.getElementById("submit").disabled = document.getElementById("name_list").value == "not chosen";
}

// Submit to localStorage.users
function submit() {
    const class_name = document.getElementById("class_list").value;
    const name = document.getElementById("name_list").value;
    const tag = students[class_name][name];
    
    let users = JSON.parse(localStorage.users || "{}");
    users[name] = tag;
    localStorage.users = JSON.stringify(users);
    
    window.location.href = "../";
}