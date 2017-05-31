// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') 
  require.ensure = (d, c) => c(require)
if (typeof bundleIdentyfiy === "undefined") 
  var bundleIdentyfiy = {
    who: "server"
  }

import App from '../modules/app.jsx'
import TestIndex from '../modules/Test/index.jsx'
import TestTest1 from '../modules/Test/Test1.jsx'



export default {
  path : '/',
  component : App,
  indexRoute : {
    component: TestIndex,
    name: "家装e站"
  },
  childRoutes : [
    {
      path: 'index',
      component: TestIndex,
      name: "家装e站"
    },{
      path:'test',
      component:TestTest1,
      name: "家装e站"
    }
  ]
}
