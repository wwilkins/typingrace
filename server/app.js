var express = require('express'),
  app = module.exports = express.createServer(),
  io = require('socket.io');

  // Configuration
app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  // app.use(express.session({ secret: 'f65f695e39a1790d9a805f51007c3aa1', store: sessionStore }));
  app.use(app.router);
  app.use(express.static(__dirname + '/../public'));
});

app.listen(3000, function () {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

io = io.listen(app);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});