const {ipcRenderer}  = require('electron')
var closews = document.getElementById('sign_button')
closews.onclick = function (){
    ipcRenderer.send("changepage","to home_page");
}