var client = require('@recipher/client');

module.exports = function(done) {
  client(__dirname + '/dist', done);
};