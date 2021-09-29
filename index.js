var { app,BrowserWindow,ipcMain,Menu,MenuItem }= require('electron')
// const path = require('path')
// const {robot} = require('robotjs') 
app.allowRendererProcessReuse = false;
// if (require('electron-squirrel-startup')) { 
//   app.quit();
// }

var mainWindow = null
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 1027,
    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false,
            // just add this row
            enableRemoteModule: true
    }
  })

  mainWindow.loadFile('src/sign/index.html');
  mainWindow.on('closed',()=>{
    mainWindow = null
  })

  mainWindow.webContents.openDevTools();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


ipcMain.on('createMenu',event => { 
	//! 生成菜单
	const menu = new Menu();
	menu.append(new MenuItem({ label: '退出游戏', click: () => {
        mainWindow.loadFile('src/sign/index.html');
			}
		})
	);
	const win = BrowserWindow.fromWebContents(event.sender);
	menu.popup(win);
});

ipcMain.on('changepage',(event,data) => { 
  switch (data){
    case "to home_page":
      mainWindow.loadFile('src/room/index.html');
      break;
    case "to sign":
      mainWindow.loadFile('src/sign/index.html');
      break; 
       case "to sign":
      mainWindow.loadFile('src/sign/index.html');
      break; 
      case "to websocket":
        mainWindow.loadFile('src/websocket/websocket.html');
      break; 
  }
});