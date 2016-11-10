var express = require('express'),
  logger = require('morgan'),
  app = express(),
  // Compile the Jade template for homepage.
  // Does synchronous fs but it's acceptable at startup as require() itself is
  // synchronous and blocking.
  template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade');

// Add logger to Express.
app.use(logger('dev'));

// Add static middleware to Express.
app.use(express.static(__dirname + '/static'));

// Add route to serve homepage.
app.get('/', function(req, res, next) {
  try {
    // Pass data to the template, which renders HTML.
    var html = template({ title: 'Home' });
    res.send(html);
  }
  catch(e) {
    next(e);
  }
});


app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000));
});

