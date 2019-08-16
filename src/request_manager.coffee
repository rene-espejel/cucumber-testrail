request = require 'request-promise'

class RequestManager

  constructor: (@opts = {}) ->

  send: (type, {url, body}) ->
    opts = @_generateOpts url: url, username: @opts.username, password: @opts.password, body: body
    req = request.get
    req = request.post if type is 'post'
    req opts
      .then (resp) ->
        JSON.parse resp
      .catch (err) ->
        errorResponse = err.error
        console.log errorResponse
        console.log errorResponse.includes "Field: case_id is not a valid test case."
        console.log "sadsad Field: case_id is not a valid test case. 8137298371378".includes "Field: case_id is not a valid test case."
        if errorResponse.includes "Field: case_id is not a valid test case."
          console.log "The test case with id: " + url.substr(url.lastIndexOf("/") + 1) + " is not on the selected Test Run"
        else
          throw new Error err


  _generateOpts: ({url, body, username, password}) ->
    url: url
    headers:
      'Content-Type': 'application/json'
    body: JSON.stringify body
    auth: {username, password}

module.exports = RequestManager
