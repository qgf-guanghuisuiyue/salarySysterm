const express = require('express');
const app = express();
var compression = require('compression');
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')

var proxyTable =  {
      '/mobile': {target:'http://192.168.1.251:8089/'}
    }

app.use(compression());

app.use('/static', express.static('./dist/static'))
app.use('/', express.static('./dist'))

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
