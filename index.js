const { app, BrowserWindow, Menu } = require('electron')
const shell = require('electron').shell
const exec = require('child_process')
const os = require('os')
const colors = require('colors')

colors.setTheme({
    success: 'bgGreen',
    error: 'red'
})

const username = os.userInfo().username

function createWindow() {
    console.log('createWindow'.success)
    console.log('argv'.yellow, process.argv)
    const win = new BrowserWindow({
        width: 1300,
        height: 750,
        minWidth: 995,
        minHeight: 750,
        fullscreenable: true,
        hasShadow: true,
        titleBarStyle: "customButtonsOnHover",
        webPreferences: {
            nodeIntegration: true
        }
    })

    var menu = Menu.buildFromTemplate([
        {
            label: 'File',
            role: 'fileMenu',
            submenu: [
                {
                    label: 'New window',
                    click() {
                        createWindow()
                    },
                    accelerator: 'CmdOrCtrl+Shift+W'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Exit',
                    role: 'close',
                    click() {
                        app.quit()
                    },
                    accelerator: 'CmdOrCtrl+Q'
                }
            ]
        },
        {
            label: 'Config',
            submenu: [
                {
                    label: 'Open settings',
                    click() {
                        exec.exec(`start notepad.exe "C:\\Users\\${username}\\AppData\\Roaming\\DownloadManagerConfig\\settings.json`, (err, stdout) => {
                            if (err) {
                                console.error(err)
                            }
                            console.log(stdout)
                        })
                    },
                    accelerator: 'CmdOrCtrl+Shift+S'
                },
                {
                    label: 'Open dev tools',
                    click() {
                        win.webContents.openDevTools()
                    },
                    accelerator: 'CmdOrCtrl+Shift+D'
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'GitHub',
                    click() {
                        shell.openExternal('https://github.com/cmxdev/downloadmanager')
                    },
                    accelerator: 'CmdOrCtrl+Shift+G'
                }
            ]
        }
    ])

    Menu.setApplicationMenu(menu)

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})