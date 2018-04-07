// import something here

// leave the export, even if you don't use it
export default ({
  app,
  router,
  Vue
}) => {
  // something to do
  const moment = require('moment')
  require('moment/locale/zh-cn')
  Vue.use(require('vue-moment'), {
    moment
  })
}
