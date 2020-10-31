//display number of downloads
document.getElementById('ds-len').textContent = Object.keys(files).length

//get and clear output element
var o = document.getElementById('ds')
o.innerHTML = ''

var len = Object.keys(files).length
var arr = 0
var cards3 = 0

//cycle through all the files
while (arr < len) {
    const fullfilepath = path + '\\' + files[arr]
    var badgeclass = ''
    var filetype = ''
    var stats = fs.statSync(fullfilepath)
    var icon = 'file-text'

    if (stats.size == 0) {
        //file is probably a directory
        //if a file is 0KB in size it is treated as a directory
        filetype = 'Directory'
        fullfilepath += '\\'
    }
    else {
        //file is probably just a regular file
        //get the filetype of the file
        if (path.extname(files[arr]) == '' || path.extname(files[arr]) == '.') {
            filetype = 'Empty'
        }
        else {
            filetype = path.extname(files[arr]).slice('.')
        }

        //get icon
        if (filetype == 'Directory') {
            icon = 'folder'
        }
        else if (filetype == 'mp4') {
            icon = 'film'
        }
        else if (filetype == 'msi') {
            icon = 'package'
        }
        else if (filetype == 'jpeg' || filetype == 'jpg' || filetype == 'png' || filetype == 'jfif' || filetype == 'gif') {
            icon = 'image'
        }
        else if (filetype == 'woff') {
            icon = 'type'
        }
        else if (filetype == 'zip') {
            icon = 'folder-plus'
        }
        else if (filetype == 'mp3' || filetype == 'wav' || filetype == 'ogg') {
            icon = 'headphones'
        }

        if (s.view.type == 'rows') {
            //create rows of one file per line
        }
        else if (s.view.type == 'cards3') {
            //create rows of 3 files per line

            //create rows
            //each row has 3 cards
        }
    }
}