#! /usr/bin/env node

const program = require('commander')
const process = require('process');
const fs = require('fs')
const assert = require('assert');
const path = require('path')
const execSync = require('child_process').execSync;


program
    .allowUnknownOption()
    .usage(' <command>')

program
    .command('version')
    .action(() => console.log(require('../package.json').version))

program
    .command('init [dir_en] [dir_lo]')
    .alias('i')
    //.option("-r, --raw", "Do not attach default extension")
    .action(function(dir_en, dir_lo) {
        try {
            //assert(arguments.length==2)
            dir_en_path_str = dir_en+".localized"
            dir_en_path = path.resolve(dir_en_path_str)
            dir_en_lo_path = path.resolve(dir_en_path,".localized")
            fs.mkdirSync(dir_en_path)
            fs.mkdirSync(dir_en_lo_path)
            dir_lo_str = "\""+dir_en+"\" = \""+dir_lo+"\";"
            dir_lo_file_path= path.resolve(dir_en_lo_path,"zh_CN.strings")
            fs.writeFileSync(dir_lo_file_path,dir_lo_str)

        } catch (e) {
            console.log(e.message || e)
            return false;
        }
    })

program.parse(process.argv)
