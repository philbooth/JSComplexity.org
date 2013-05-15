constants = require './constants'
pubsub = require 'pub-sub'
eventBroker = pubsub.getEventBroker constants.names.eventBroker

initialise = ->
  eventBroker.subscribe
    name: constants.events.analyseSource
    callback: analyse

analyse = (event) ->
  xhr = new XMLHttpRequest()
  xhr.onreadystatechange = ->
  # TODO: xhr.open etc
  # TODO: show result, draw chart

module.exports = { initialise }

