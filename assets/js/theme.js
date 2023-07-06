var toggle = document.getElementById("theme-toggle");
var storedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

function setToggleIcon() {
    toggle.innerHTML = storedTheme === "dark" ? "☀️" : "🌙";
}

setToggleIcon();

if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme)
}

toggle.onclick = function() {
    console.log("toggling")
    var newTheme = "dark";
    if (storedTheme === "dark") {
        newTheme = "light";
    }
    storedTheme = newTheme;

    localStorage.setItem("theme", storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
    setToggleIcon();
};
