constants = require './constants'
form = require './form'

formElement = document.getElementById constants.ids.form
if formElement
  form.initialise formElement

