<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from "./components/login.vue";
import Register from "./components/register.vue";
import Home from "./components/homePage.vue";
import addContact from "./components/addContact.vue";
import editContact from "./components/editContact.vue";

export default {
  components: {
    login: Login,
    register: Register,
    home: Home,
    addContact: addContact,
    editContact: editContact
  },

  data() {
    return {
      component: "login"
    };
  }
};
</script>

<style>

</style>
