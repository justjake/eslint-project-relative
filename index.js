#!/usr/bin/env node

var kexec = require('kexec')
var yargs = require('yargs')
var path = require('path')
var shell = require('shelljs')
var resolve = require('resolve')
var fs = require('fs')

function getFileArgs() {
  return yargs.argv._
}

function eslintNearFile(file) {
  if (file[0] !== '/') {
    file = path.join(shell.pwd(), file)
  }

  var dir = shell.test('-d', file)
    ? file
    : path.dirname(file)

  // resolve eslint
  try {
    var resolvedLocation = resolve.sync('eslint/package.json', { basedir: dir })
    var eslintPackageDir = path.dirname(resolvedLocation)
    var eslintPackage = JSON.parse(fs.readFileSync(resolvedLocation))
    return path.join(eslintPackageDir, eslintPackage.bin.eslint)
  } catch (err) {
    shell.echo('could not find eslint near ' + file)
    return shell.which('eslint')
  }
}

function main() {
  var options = getFileArgs()
  var relativeFrom = options.length === 0
        ? shell.pwd()
        : options[0]
  var exe = eslintNearFile(relativeFrom)
  if (exe) {
    // shell.echo("using eslint at " + exe)
    kexec(exe, process.argv)
  } else {
    shell.echo('eslint not found')
    process.exit(1)
  }
}

main()
