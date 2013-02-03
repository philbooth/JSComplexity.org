'use strict';

{exec} = require 'child_process'

commands =
  prepare: 'npm install'
  compile: './node_modules/.bin/coffee -c -o ./public/lib ./public/src'
  bundle: './node_modules/.bin/browserify ./public/lib/bootstrap.js -o ./public/lib/site.js'
  minify: './node_modules/.bin/uglifyjs --no-copyright --compress --output ./public/lib/site.min.js ./public/lib/site.js'

desc 'Install dependencies.'
task 'prepare', ->
  runTask prepare, 'Preparing the build environment...'
, async: true

desc 'Compile the CoffeeScript into JavaScript.'
task 'compile', ->
  runTask compile, 'Compiling CoffeeScript...'
, async: true

desc 'Bundle the compiled JavaScript as an atomic package.'
task 'bundle', [ 'compile' ], ->
  runTask bundle, 'Bundling JavaScript...'
, async: true

desc 'Minify the bundled JavaScript.'
task 'minify', [ 'bundle' ], ->
  runTask minify, 'Minifying JavaScript...'
, async: true

runTask = (operation, message) ->
  console.log message
  operation()

prepare = ->
  runCommand commands.prepare

compile = ->
  runCommand commands.compile

bundle = ->
  runCommand commands.bundle

minify = ->
  runCommand commands.minify

runCommand = (command) ->
  exec command, { cwd: __dirname }, (error, stdout, stderr) ->
    console.log stdout
    handleError error
    after()

handleError = (error) ->
  if error?
    console.log error.message
    process.exit 1

after = ->
  process.env.NODE_PATH = originalNodePath
  complete()

originalNodePath = process.env.NODE_PATH

