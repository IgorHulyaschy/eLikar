import Koa from 'koa'

const koa = new Koa()

koa.listen(3000, () => {
  console.log('Server is running')
})
