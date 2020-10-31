//DMW
//Background worker for **DownloadManager**.

console.log('DMW INIT.')

const fs = require('fs')

const dec = new TextDecoder('utf-8')

var sp = fs.readFileSync('settings.json')
var ds = dec.decode(sp)

const s = JSON.parse(ds)

const df = s.downloadsFolder

if (s.background[0].watchDownloads == true) {
    //watch downloads folder
}