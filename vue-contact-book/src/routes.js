import login from './components/login.vue';
import register from './components/register.vue';
import home from './components/homePage.vue'
import addContact from './components/addContact.vue';
import editContact from './components/editContact.vue'

export default [
    { path: '/', component: login},
    { path: '/register', component: register},
    { path: '/home', component: home},
    { path: '/addContact', component:addContact},
    { path: '/editContact', component:editContact}

]
