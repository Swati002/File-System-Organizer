// To take cmd line input in js
// argv --> argument vector or argument value


// let input = process.argv[2]
// console.log(input)


const helpModule = require('./commands/help')
const organizeModule = require('./commands/organize')
const treeModule = require('./commands/tree')

const { dir } = require('console');
const fs = require('fs');
const path = require('path');
let input = process.argv.slice(2);

let command = input[0] // tree, organize, help

switch (command) {
    case 'tree':
        treeModule.treeKey(input[1])
        break;
    case 'organize':
        organizeModule.organizeKey(input[1])
        break;
    case 'help':
        helpModule.helpKey()
        break;

    default:
        console.log('Please enter a valid cmd')
        break;

}