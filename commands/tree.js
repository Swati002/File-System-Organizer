/****************TREE***************/
const fs = require('fs')
const path = require('path')

function treeFn(dirpath) {
    // console.log(dirpath)
    if (dirpath == undefined) {
        console.log('Please Enter a valid Directory Path')
        return;
    } else {
        let doesExist = fs.existsSync(dirpath)
            // console.log(doesExist)
        if (doesExist == true) {
            treeHelper(dirpath, " ")
        }
    }
}


function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile();
    if (isFile == true) {
        let fileName = path.basename(targetPath)
        console.log(indent + "├──" + fileName)
    } else {
        let dirName = path.basename(targetPath);
        console.log(indent + "└──" + dirName)

        let children = fs.readdirSync(targetPath)
            // console.log(children)
            // Here we took out all the children of test folder
            // 

        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(targetPath, children[i]);
            // console.log(childPath)
            treeHelper(childPath, indent + "\t")

        }
    }
}

module.exports = {
    treeKey: treeFn
}