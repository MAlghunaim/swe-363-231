const process = require('process')
console.log('when you are done type "quit" to quit')
process.stdin.on('data', (data) => {

    cleanData = data.toString(undefined, 0, data.length-2)
    let output
    switch (cleanData.toLowerCase()) {
        case 'what is your name?':
            output = 'I have no name I am just a simple script file'
            break
        case 'what is your favorite color?':
            output = 'It\'s gray'
            break
        case 'what is your favorite food?':
            output = 'I cannot eat'
            break
        case 'quit':
            process.exit()
        default:
            output = 'I don\'t understand what you mean, sorry. Please say something else'
    }
    process.stdout.write(output +'\n')
    //if(cleanData=='quit') {process.exit()}
})