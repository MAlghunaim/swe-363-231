const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('userLoggedIn', (time, id) => {
    console.log(`${time}: User_${id} logged in`)
})
eventEmitter.on('userLoggedOut', (time, id) => {
    console.log(`${time}: User_${id} logged in`)
})

module.exports = eventEmitter