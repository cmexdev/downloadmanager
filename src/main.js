const fs = require('fs')
const child_process = require('child_process')
const os = require('os')
const { start } = require('repl')
const pathmodule = require('path')

var dec = new TextDecoder('utf-8')

const user = os.userInfo().username

const firstLaunch = fs.readFileSync('src/fl')
const fl = dec.decode(firstLaunch)

//var settings = fs.readFileSync('C:\\Users\\' + user + '\\AppData\\Roaming\\DownloadManagerConfig\\settings.json')
var settings = fs.readFileSync('settings.json')
var decsettings = dec.decode(settings)

var s = JSON.parse(decsettings)

const dm = {
    "bootstrap-version": 4.5
}

console.log(s)

if (fl == 'true') {
    s.downloadsFolder = 'C:\\Users\\' + user + '\\Downloads'
    s.dmElse = 'C:\\Users\\' + user + '\\Downloads'
    var stringSettings = JSON.stringify(s)
    fs.writeFileSync('settings.json', stringSettings)
    console.log(s)
    fs.writeFileSync('fl', 'false')
}

const path = s.downloadsFolder

const elseFolder = s.dmElse

//update settings to current values
document.getElementById('dff').textContent = s.downloadsFolder
document.getElementById('dmelse').value = s.dmElse
document.getElementById('ds-folder').textContent = s.downloadsFolder

var files = ''

var sortBtn = document.getElementById('sort')

if (s.background[0].watchDownloads == true) {
    console.warn('Watching downloads folder! (Unstable feature!!)')
}

window.onload = function start() {
    if (s.dmElse) {
        console.log('Ok - the \'dmElse\' path exists.')

        console.log('Reading dir: \'' + path + '\'.')

        fs.readdir(path, (err, files) => {
            if (err) {
                console.error(err)
            }
            else {
                console.log(files)
                document.getElementById('ds-len').textContent = Object.keys(files).length
                var o = document.getElementById('ds')
                o.innerHTML = ''

                var len = Object.keys(files).length
                var arr = 0
                var cards3 = 0
                //max of cards3 is 2
                while (arr < len) {
                    var out = document.createElement('div')
                    out.className = 'filename-c p-3 border rounded'
                    out.style.marginBottom = '10px'
                    var badgeclass = ''
                    var fullfilepath = path + '\\' + files[arr]
                    var filetype = ''
                    var stat = fs.statSync(fullfilepath)

                    if (stat.size == 0) {
                        filetype = 'Directory'
                        badgeclass = 'badge badge-warning'
                        fullfilepath += '\\'
                    }
                    else {
                        if (files[arr].includes('.')) {
                            var split = files[arr].split('.')
                            var lastitem = Object.keys(split).length - 1
                            filetype = split[lastitem]
                            if (filetype == 'zip') {
                                badgeclass = 'badge badge-success'
                            }
                            else if (filetype == 'exe') {
                                badgeclass = 'badge badge-danger'
                            }
                            else {
                                badgeclass = 'badge badge-primary'
                            }
                        }
                        else {
                            filetype = 'Empty file type'
                            badgeclass = 'badge badge-danger'
                        }
                    }


                    /*var flen = Object.keys(s.fileTypes).length
                    var farr = 0
                    while (farr < flen) {
                        if (filetype == s.fileTypes[farr]) {
                            console.log('MATCH: ' + filetype)
                        }
                        else {
                            console.log(s.fileTypes[farr])
                        }
                        farr++
                    }*/

                    var filename = document.createElement('h5')
                    if (filetype == 'Directory') {
                        filename.innerHTML = '<span data-feather="folder"></span> ' + files[arr] + ' '
                    }
                    else if (filetype == 'mp4') {
                        filename.innerHTML = '<span data-feather="film"></span> ' + files[arr]
                    }
                    else if (filetype == 'msi') {
                        filename.innerHTML = '<span data-feather="package"></span> ' + files[arr]
                    }
                    else if (filetype == 'jpeg' || filetype == 'jpg' || filetype == 'png' || filetype == 'jfif' || filetype == 'gif') {
                        filename.innerHTML = '<span data-feather="image"></span> ' + files[arr]
                    }
                    else if (filetype == 'woff') {
                        filename.innerHTML = '<span data-feather="type"></span> ' + files[arr]
                    }
                    else if (filetype == 'zip') {
                        filename.innerHTML = '<span data-feather="folder-plus"></span> ' + files[arr]
                    }
                    else if (filetype == 'mp3' || filetype == 'wav' || filetype == 'ogg') {
                        filename.innerHTML = '<span data-feather="headphones"></span> ' + files[arr]
                    }
                    else if (filetype == 'url') {
                        filename.innerHTML = '<span data-feather="link"></span> ' + files[arr]
                    }
                    else if (filetype == 'ini') {
                        filename.innerHTML = '<span data-feather="settings"></span> ' + files[arr]
                    }
                    else if (filetype == 'Empty file type') {
                        filename.innerHTML = '<span data-feather="file"></span> ' + files[arr]
                    }
                    else {
                        filename.innerHTML = '<span data-feather="file-text"></span> ' + files[arr]
                    }
                    filename.href = '#'
                    filename.className = 'filename'
                    filename.id = fullfilepath
                    filename.setAttribute('filetype', filetype)
                    filename.oncontextmenu = function(event) {
                        event.preventDefault()
                        var ctxmenu = document.getElementById('item-context-menu')
                        ctxmenu.setAttribute('cmel', event.target.id)
                        ctxmenu.setAttribute('ft', event.target.getAttribute('filetype'))
                        ctxmenu.style.display = 'block'
                        ctxmenu.style.position = 'fixed'
                        ctxmenu.style.left = (event.pageX - 25) + 'px'
                        ctxmenu.style.top = (event.pageY - (window.scrollY)) + 'px'
                    }
                    var filet = document.createElement('span')
                    filet.className = badgeclass
                    filet.innerHTML = filetype
                    filename.appendChild(filet)
                    out.appendChild(filename)

                    var filepath = document.createElement('small')
                    filepath.textContent = fullfilepath
                    filepath.className = 'text-muted'
                    out.appendChild(filepath)

                    var hr = document.createElement('br')

                    o.appendChild(out)
                    //o.appendChild(hr)

                    arr++
                }

                feather.replace()
            }
        })
    }
    else if (!s.dmElse) {
        console.error('Error - missing attribute \'dmElse\'.')
    }
}

document.addEventListener('click', function(event) {
    if (document.getElementById('item-context-menu').style.display != 'none') {
        document.getElementById('item-context-menu').style.display = 'none'
    }
})

document.getElementById('movenewpathdialogclose').onclick = function hideDialog() {
    document.getElementById('movenewpathdialog').hidden = true
    document.getElementById('main').style.opacity = '100%'
}

document.getElementById('cmopen').onclick = function openItem() {
    var fpath = document.getElementById('item-context-menu').getAttribute('cmel')
    var filetype = document.getElementById('item-context-menu').getAttribute('ft')

    if (filetype == 'Directory') {
        child_process.exec('start explorer.exe "' + fpath + '"')
    }
    else {
        child_process.exec(fpath)
    }
}

document.getElementById('cmdelete').onclick = function deleteFile() {
    var path = document.getElementById('item-context-menu').getAttribute('cmel')
    var filetype = document.getElementById('item-context-menu').getAttribute('ft')

    //confirm that user wants to delete this file
    if (confirm('Are you sure you want to delete "' + path + '"? (This action can be undone within the Recycle Bin)') == true) {
        //user is sure
        fs.unlinkSync(path)
    }
}

document.getElementById('cmsort').onclick = function sortFile() {
    sort('sortone', document.getElementById('item-context-menu').getAttribute('cmel'), document.getElementById('item-context-menu').getAttribute('ft'))
}

document.getElementById('cmcopy').onclick = function copyPath() {
    //credit to https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
    //for main function

    /*
    problem with my first solution: it was hidden
    i guess you can't select an element that is hidden
    so, you can just place it really far off screen so
    you can't see it.
    */
    var pathtocopy = document.getElementById('item-context-menu').getAttribute('cmel')

    var el = document.createElement('textarea')
    el.value = pathtocopy
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}

document.getElementById('cmmove').onclick = function moveItem() {
    var oldpath = document.getElementById('item-context-menu').getAttribute('cmel')
    console.log(oldpath)
    move('single', oldpath)
}

function move(action, oldpath) {
    //get new path
    console.log(oldpath)
    var dialog = document.getElementById('movenewpathdialog')
    dialog.hidden = false
    dialog.style.position = 'absolute'
    document.getElementById('main').style.opacity = '50%'
    dialog.style.left = '100px'
    dialog.style.top = '100px'
}
document.getElementById('movenewpathdialoggo').onclick = moveNow(document.getElementById('item-context-menu').getAttribute('cmel'), document.getElementById('movenewpathin').value)
function moveNow(oldpath, newpath) {
    fs.renameSync(oldpath, newpath)
    console.log('moved?')
}

function sort(action, sortpath, ft) {
    if (action == 'sortall') {
        //sort all files
        console.log('Sorting files...')
        //get all files and their filetypes
        fs.readdir(path, (err, files) => {
            if (err) {
                console.error('Error')
                console.error(err)
            }
            else {
                console.log('Working...')
                var len = Object.keys(files).length
                var arr = 0

                while (arr < len) {
                    //check the current files filetype with any key in settings.json

                    //get the filetype
                    var filetype = ''
                    var split = files[arr].split('.')
                    var lastitem = Object.keys(split).length - 1
                    filetype = split[lastitem]

                    for (var key in s.fileTypes[0]) {
                        if (key == filetype) {
                            //match found then move file to specified dir

                            const newpath = s.fileTypes[0][key] + '\\' + files[arr]
                            const curpath = path + '\\' + files[arr]

                            console.log(curpath + ' to ' + newpath)

                            fs.rename(curpath, newpath, (err) => {
                                if (err) {
                                    console.error(err)
                                }
                                else {
                                    console.log('Moved file: ' + curpath + ' to ' + newpath)
                                }
                            })
                        }
                    }

                    arr++
                }
            }
        })
    }
    else if (action == 'sortone') {
        //sort only one file

        if (sortpath) {
            if (ft == 'Directory') {
                console.error('folder cannot be sorted yet')
            }
            else {
                var split = sortpath.split('\\')
                var len = split.length - 1
                var fn = split[len]
                for (var key in s.fileTypes[0]) {
                    if (key == ft) {
                        const newpath = s.fileTypes[0][key] + '\\' + fn
                        const curpath = sortpath

                        console.log(curpath + ' to ' + newpath)

                        fs.renameSync(curpath, newpath)
                    }
                }
            }
        }
    }
}

function openTerminal(p) {
    if (p == 'dmfolder') {
        child_process.execSync('start cmd /K cd "' + path + '"')
    }
}