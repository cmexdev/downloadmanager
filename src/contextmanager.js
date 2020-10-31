var filename = document.querySelectorAll('filename-c')

filename.addEventListener('contextmenu', function(event) {
    event.preventDefault()
    var ctxmenu = document.getElementById('item-context-menu')
    ctxmenu.style.display = 'block'
    ctxmenu.style.left = (event.pageX - 10) + 'px'
    ctxmenu.style.top = (event.pageY - 10) + 'px'
},false)
document.addEventListener('click', function(event) {
    var ctxmenu = document.getElementById('item-context-menu')
    ctxmenu.style.display = ''
    ctxmenu.style.left = ''
    ctxmenu.style.top = ''
})