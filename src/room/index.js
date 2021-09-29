const {ipcRenderer}  = require('electron')
// cate1.onclick = function (){
//     ipcRenderer.send("changepage","to home_page");
// }
// cate2.onclick = function (){
//     ipcRenderer.send("changepage","to gesture_check");
// }
// cate3.onclick = function (){
//     ipcRenderer.send("changepage","to presentation");
// }
//生成小菜单
var createMenu = document.getElementById('signal')
createMenu.onclick=function (){
    ipcRenderer.send("createMenu");
}
var gest1 = document.getElementById('gest_n1')
var gest2 = document.getElementById('gest_n2')
var gest3 = document.getElementById('gest_n3')
var gest4 = document.getElementById('gest_n4')
var gest5 = document.getElementById('gest_n5')
var gest6 = document.getElementById('gest_m6')
var gest7 = document.getElementById('gest_m7')
var gest8 = document.getElementById('gest_m8')
var gest9 = document.getElementById('gest_m9')
var gest10 = document.getElementById('gest_m10')
gest1.onclick = function (){
    localStorage.setItem('room',1);
    ipcRenderer.send("changepage","to websocket");
}
gest2.onclick = function (){
    localStorage.setItem('room',2);
    ipcRenderer.send("changepage","to websocket");
}
gest3.onclick = function (){
    localStorage.setItem('room',3);
    ipcRenderer.send("changepage","to websocket");
}
gest4.onclick = function (){
    localStorage.setItem('room',4);
    ipcRenderer.send("changepage","to websocket");
}
gest5.onclick = function (){
    localStorage.setItem('room',5);
    ipcRenderer.send("changepage","to websocket");
}
gest6.onclick = function (){
    localStorage.setItem('room',6);
    ipcRenderer.send("changepage","to websocket");
}
gest7.onclick = function (){
    localStorage.setItem('room',7);
    ipcRenderer.send("changepage","to websocket");
}
gest8.onclick = function (){
    localStorage.setItem('room',8);
    ipcRenderer.send("changepage","to websocket");
}
gest9.onclick = function (){
    localStorage.setItem('room',9);
    ipcRenderer.send("changepage","to websocket");
}
gest10.onclick = function (){
    localStorage.setItem('room',10);
    ipcRenderer.send("changepage","to websocket");
}
