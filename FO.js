// To take cmd line input in js
// argv --> argument vector or argument value


// let input = process.argv[2]
// console.log(input)

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "text",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
    images: ["jpg", "png", "svg"],
};


const { dir } = require('console');
const fs = require('fs');
const path = require('path');
let input = process.argv.slice(2);

let command = input[0] // tree, organize, help

switch (command) {
    case 'tree':
        console.log('Tree Implemented')
        break;
    case 'organize':
        // console.log('Organize Implemented')
        organizeFn(input[1])
        break;
    case 'help':
        // console.log('Help Implemented')
        helpfn()
        break;

    default:
        console.log('Please enter a valid cmd')
        break;

}




function helpfn() {
    console.log(`List of all Commands -
                    1) Tree Command - node FO.js tree <dirname>
                    2) Organize Command - node FO.js organize <dirname>
                    3) Help Command - node FO.js help`)
}

function organizeFn(dirpath) {
    console.log(dirpath)
    let destpath;
    if (dirpath == undefined) {
        console.log('Please Enter a valid Directory Path')
        return;
    } else {
        let doesExist = fs.existsSync(dirpath)
            // console.log(doesExist)

        if (doesExist == true) {
            destpath = path.join(dirpath, "organized_files")

            if (fs.existsSync(destpath) == false) {
                fs.mkdirSync(destpath);
            } else {
                console.log("Folder Already Exist");
            }
        } else {
            console.log("Please Enter a valid path")
        }
    }
    organizeHelper(dirpath, destpath)
}


// We are writing this function to categorize our files
function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src) //get all the files inside your src
        // console.log(childNames)
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        // console.log(childAddress)
        let isFile = fs.lstatSync(childAddress).isFile();
        // console.log(childAddress + " --> " + isFile)

        if (isFile == true) {
            let fileCategory = getCategory(childNames[i])
            console.log(childNames[i] + " belongs to " + fileCategory)

            sendFiles(childAddress, dest, fileCategory)
        }
    }
}

function getCategory(name) {
    let ext = path.extname(name)
    ext = ext.slice(1) //To remove dot in extNames
    console.log(ext)

    for (let type in types) {
        let cTypearr = types[type]
            // console.log(cTypearr)

        for (let i = 0; i < cTypearr.length; i++) {
            if (ext == cTypearr[i]) {
                // We matched the extensions with the values present in cTypeArr
                return type;
            }
        }

    }
    return 'others'
}

function sendFiles(srcFilePath, dest, fileCategory) {
    let catPath = path.join(dest, fileCategory)


    if (fs.existsSync(catPath) == false) { // checking for category folder path 
        fs.mkdirSync(catPath)
    }


    let fileName = path.basename(srcFilePath) /// we took out the names of the files
    let destFilePath = path.join(catPath, fileName) // here we created a path for the files in category folders


    fs.copyFileSync(srcFilePath, destFilePath) // copied files from src to dest

    fs.unlinkSync(srcFilePath) // deleted the files from src


    console.log(fileName + "is copied to" + fileCategory)
}


/****************TREE***************/
function treeFn(dirpath) {
    // console.log(dirpath)
    if (dirpath == undefined) {
        console.log('Please Enter a valid Directory Path')
        return;
    } else {
        let doesExist = fs.existsSync(dirpath)
            // console.log(doesExist)
        if (doesExist == true) {
            treeHelper(dirpath)
        }
    }
}


function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile();
    if (isFile == true) {
        let fileName = path.basename(targetPath)
        console.log(indent + "├──" + fileName)
    }
}