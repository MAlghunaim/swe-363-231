// BE 2 excercise 2
const fs = require('fs')
const { program } = require('commander');
const { join } = require('path');


program
.command("copyDir <srcDir> <desDir>")
.description("Copy a directory to another directory with the ability to filter certain files")
.option('-f, --filter <ext>')
.action((src, des, options) => {
    copyDir(src, des, options.filter)
});

program.parse(process.argv);

function copyDir(src, des, ext) {
    const readDir = fs.readdirSync(src)
    const innerFolders = readDir.filter((item) => fs.statSync(join(src, item)).isDirectory())

    function fileNameExtractor(item, ext) {
        if (ext !== undefined) {
            return !innerFolders.includes(item) && item.endsWith(ext)
        } else {
            return !innerFolders.includes(item) 
        }
    }


    const innerFiles = readDir.filter((item) => fileNameExtractor(item, ext))
    if(!fs.existsSync(des)) fs.mkdirSync(des)
    innerFiles.forEach((fileName) => {
        const file = fs.readFile(join(src, fileName), null, (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            
            fs.writeFile(join(des, fileName), data, (err) => console.log(`copied ${fileName} successfully to ${join(des, fileName)}`))
        })
    })
    innerFolders.forEach((folderName) => {
        copyDir(join(src, folderName), join(des, folderName), ext)
    })
    
}