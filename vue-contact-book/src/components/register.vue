<template>
<div>
  <div class="header">
       <router-link to="/home"  class="logo">Contact-book</router-link>
    </div>
  <div id="add-user">
    <h2>Register</h2>
    <form>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" v-model.lazy="user.name" class="form-control" :class="{ 'is-invalid': submitted && $v.user.name.$error }"/>
        <div v-if="submitted && !$v.user.name.error" class="invalid-feedback">
          <span v-if="!$v.user.name.required">Name is required</span>
          <span v-if="!$v.user.name.minLength">Name must be at least 3 characters</span>
        </div>
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model.lazy="user.email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
          <span v-if="!$v.user.email.required">Email is required</span>
          <span v-if="!$v.user.email.email">Email is invalid</span>
        </div>
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model.lazy="user.password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
        <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
          <span v-if="!$v.user.password.required">Password is required</span>
          <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
        </div>
      </div>
       <div class="form-group">
        <label>Retype Password:</label>
        <input type="password" v-model.lazy="user.rePassword" class="form-control" :class="{ 'is-invalid':$v.user.rePassword.$error }" />
        <div v-if="$v.user.rePassword.$error" class="invalid-feedback">
          <span v-if="!$v.user.rePassword.sameAsPassword">Password must be identical</span>
        </div>
      </div>
      <div class="form-group" id="alignlogin">
        <button v-on:click.prevent="handleSubmit(e)" class="btn btn-primary">Register</button>
        <button v-on:click="navigateToLogin()" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import { required, minLength,sameAs, between,email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      submitted: false,
      e:""
    };
  },
  validations: {
    user: {
      name: { required ,minLength: minLength(3) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      rePassword:{sameAsPassword: sameAs('password')}
    }
  },
  methods: {
    post: function() {
      this.$http
        .post("http://localhost:3000/api/users/post",this.user).then(function(data) {
          console.log(data);
        });
    },
    navigateToLogin: function() {
      this.$router.push("/");
    },
    handleSubmit:function(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.user.$touch();
      if (this.$v.user.$invalid) {
        return;
      }
      this.post();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
#alignlogin{
  display: grid;
}
.btn-primary{
  background-color: #56b9bd

}
.btn-primary:hover {
    color: #fff;
    background-color: #8d96a2;
    border-color: #0e0e0e;
}
.header {
  overflow: hidden;
  background-color: #56b9bd;
  padding: 20px 10px;
  text-align: center;
  display: grid;
}

/* Style the header links */
.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}

/* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

/* Change the background color on mouse-over */
.header a:hover {
  /* background-color: #ddd; */
  color: black;
}

/* Style the active/current link*/
.header a.active {
  background-color: dodgerblue;
  color: white;
}



#add-user * {
  box-sizing: border-box;
}
#add-user {
  margin: 20px auto;
  max-width: 500px;
}
button {
  display: block;
  margin: 20px 0 10px;
  color: black;
  /* background-color:#eee; */
}

label {
  display: block;
  margin: 20px 0 10px;
  /* background: #eee; */
}
input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: 8px;
}
h3 {
  margin-top: 10px;
}
</style>
