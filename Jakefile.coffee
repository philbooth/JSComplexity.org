'use strict';

{exec} = require 'child_process'

commands =
  prepare: 'npm install'
  compile: './node_modules/.bin/coffee -c -o ./client/lib ./client/src'
  bundle: './node_modules/.bin/browserify ./client/lib/bootstrap.js -o ./client/lib/jscomplexity.js'
  minify: './node_modules/.bin/uglifyjs --compress --mangle --output ./public/lib/jscomplexity.min.js ./client/lib/jscomplexity.js'

desc 'Install dependencies.'
task 'prepare', ->
  runCommand 'prepare', 'Preparing the build environment...'
, async: true

desc 'Compile the CoffeeScript into JavaScript.'
task 'compile', ->
  runCommand 'compile', 'Compiling CoffeeScript...'
, async: true

desc 'Bundle the compiled JavaScript as an atomic package.'
task 'bundle', [ 'compile' ], ->
  runCommand 'bundle', 'Bundling JavaScript...'
, async: true

desc 'Minify the bundled JavaScript.'
task 'minify', [ 'bundle' ], ->
  runCommand 'minify', 'Minifying JavaScript...'
, async: true

runCommand = (command, message) ->
  console.log message
  exec commands[command], { cwd: __dirname }, (error, stdout, stderr) ->
    console.log stdout
    handleError error
    complete()

handleError = (error) ->
  if error?
    console.log error.message
    process.exit 1

