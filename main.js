const fs = require('fs')
const child_process = require('child_process')
const os = require('os')

var dec = new TextDecoder('utf-8')

var settings = fs.readFileSync('settings.json')
var decsettings = dec.decode(settings)

var s = JSON.parse(decsettings)

const path = s.downloadsFolder

const elseFolder = s.dmElse

var files = ''

var sortBtn = document.getElementById('sort')

window.onload = function start() {
    if (s.dmElse) {
        console.log('Ok - the \'dmElse\' path exists.')

        console.log('Reading dir: \'' + path + '\'.')

        fs.readdir(path, (err, files) => {
            if (err) {
                console.error(err)
            }
            else {
                document.getElementById('ds-len').textContent = Object.keys(files).length
                var o = document.getElementById('ds')

                var len = Object.keys(files).length
                var arr = 0
                console.log(files)
                while (arr < len) {
                    var out = document.createElement('div')
                    out.className = 'filename-c'
                    var badgeclass = ''
                    var fullfilepath = path + '\\' + files[arr]
                    var filetype = ''
                    var filestats = ''
                    var curfile = files[arr]

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
                        filetype = 'Directory'
                        badgeclass = 'badge badge-warning'
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
                    filename.textContent = files[arr]
                    filename.href = '#'
                    filename.className = 'filename'
                    var filet = document.createElement('span')
                    filet.className = badgeclass
                    filet.textContent = filetype
                    filename.appendChild(filet)
                    out.appendChild(filename)

                    var filepath = document.createElement('small')
                    filepath.textContent = path + '\\' + files[arr]
                    filepath.className = 'text-muted'
                    out.appendChild(filepath)

                    var hr = document.createElement('hr')
                    out.appendChild(hr)

                    o.appendChild(out)

                    arr++
                }
            }
        })
    }
    else if (!s.dmElse) {
        console.error('Error - missing attribute \'dmElse\'.')
    }
}

function sort() {
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