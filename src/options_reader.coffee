_ = require 'lodash'
minimist = require 'minimist'
REQUIRED_SCRIPT_OPTIONS = ['result', 'username', 'password', 'config', 'runid']

class OptionsReader

  constructor: ->
    @alias =
      u: 'username', p: 'password', c: 'config', r: 'result', i: 'runid', n: 'newrun', t: 'runname'
    @unknown = (opt) -> throw new Error "unrecognized option #{opt} passed in command line"

  parse: ->
    @opts = minimist process.argv[2..], alias: @alias, unknown: @unknown
    missingOptions = @_validateOptions()
    throw new Error "script is missing these required options: #{missingOptions}" if missingOptions.length
    if @opts.newrun == 'true'
      @opts.newrun = true
    if @opts.newrun == true and @opts.runname == undefined
      throw new Error "If a new test run is generated a test run name needs to be specified with -t"
    @opts

  _validateOptions: ->
    params = Object.keys @opts
    required_options = REQUIRED_SCRIPT_OPTIONS
    required_options.splice 1, 1
    _.compact required_options.map (field) ->
      field unless field in params

module.exports = OptionsReader
