constants = require './constants'
pubsub = require 'pub-sub'

initialise = (element) ->
  eventBroker = pubsub.getEventBroker constants.names.eventBroker

  element.addEventListener constants.events.submit, (event) ->
    eventBroker.publish pubsub.createEvent
      name: constants.events.analyseSource
      data: serialiseForm element

    event.preventDefault()

serialiseForm = (element) ->
  result = {}
  inputs = element.getElementsByTagName 'input'

  for input in inputs
    result[input.getAttribute 'name'] = input.value

  result

