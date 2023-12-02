const EventEmitter = require('events')
const eventEmitter = require('./eventListeningApp.js')


var userCount = 0


let timeNow = new Date(Date.now())
let timer = setTimeout(logUserIn, Math.random() * (1900) + 100)

function logUserIn() {
    timeNow = new Date(Date.now())
    eventEmitter.emit('userLoggedIn', `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`, userCount)
    clearTimeout(timer)
    userCount++
    timer = setTimeout(logUserIn, Math.random() * (1900) + 100)
}