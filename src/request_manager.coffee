request = require 'request-promise'

class RequestManager

  constructor: (@opts = {}) ->

  send: (type, {url, body}) ->
    opts = @_generateOpts url: url, username: @opts.username, password: @opts.password, body: body
    req = request.get
    req = request.post if type is 'post'
    req opts
      .then (resp) ->
        console.log("Successful Response: " + resp)
        JSON.parse resp
      .catch (err) ->
        try
          failResponse = JSON.parse err
          console.log("JSON error: " + failResponse.error)
          if failResponse.error == "Field :case_id is not a valid test case."
            console.log("The test case with id: " + url.substr(url.lastIndexOf("/") + 1) + " is not on the selected Test Run")
          else
            throw new Error err
        catch
          throw new Error err
        throw new Error err

  _generateOpts: ({url, body, username, password}) ->
    url: url
    headers:
      'Content-Type': 'application/json'
    body: JSON.stringify body
    auth: {username, password}

module.exports = RequestManager
