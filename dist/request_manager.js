// Generated by CoffeeScript 2.4.1
(function() {
  var RequestManager, request;

  request = require('request-promise');

  RequestManager = class RequestManager {
    constructor(opts1 = {}) {
      this.opts = opts1;
    }

    send(type, {url, body}) {
      var opts, req;
      opts = this._generateOpts({
        url: url,
        username: this.opts.username,
        password: this.opts.password,
        body: body
      });
      req = request.get;
      if (type === 'post') {
        req = request.post;
      }
      return req(opts).then(function(resp) {
        console.log("Successful Response: " + resp);
        return JSON.parse(resp);
      }).catch(function(err) {
        return console.log("The test case with id: " + url.substr(url.lastIndexOf("/") + 1) + " is not on the selected Test Run");
      });
    }

    _generateOpts({url, body, username, password}) {
      return {
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        auth: {username, password}
      };
    }

  };

  module.exports = RequestManager;

}).call(this);

//# sourceMappingURL=request_manager.js.map
