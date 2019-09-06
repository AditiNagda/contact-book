import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuelidate from 'vuelidate'

export const bus = new Vue();

Vue.use(VueResource)
Vue.use(Vuelidate)
Vue.use(VueRouter)
library.add(faCoffee)
Vue.component('font-awesome-icon', FontAwesomeIcon)


const router=new VueRouter({
  routes:Routes
  })
  

new Vue({
  el: '#app',
  render: h => h(App),
  router:router
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = (localStorage.getItem('isLoggedIn')=='true');
    if (authRequired && !loggedIn) {
    return next('/login');
  }  next();
 });
