import Koa from 'koa'
import socket from 'socket.io'
import route from 'koa-route';

const app = new Koa()

app.use(route.get('/user', (ctx) => {
  ctx.body = 'test'
}))

const server = app.listen(3001, (err) => {
  if (err) throw err;
  console.log(`Docs are available at http://localhost:3001`);
});

const io = socket(server)

io.on('connection', function (socket) {
  setInterval(() => {
    console.log(new Date(), ' Call emmit "news"')
    socket.emit('news', { createdAt: new Date(), message: 'Message' })
  }, 2000)
  
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
