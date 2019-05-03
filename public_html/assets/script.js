// Themes
function selectTheme() {
    const theme = localStorage.darkmode == "true" ? "dark.css" : "light.css";
    
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/" + theme;
    link.id = "theme";
    
    if (document.getElementById("theme")) document.head.replaceChild(document.getElementById("theme"), link);
    else document.head.append(link);
} selectTheme();