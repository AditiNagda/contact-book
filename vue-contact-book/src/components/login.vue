<template>
  <div>
    <div class="header">
      <router-link to="/home" class="logo">Contact-book</router-link>
    </div>
    <center v-if="validUser === 'false' & submitted" style="color:red">User is not valid</center>
    <div id="login">
      <h2>Login</h2>
      <form>
        <div class="form-group">
          <label>Name:</label>
          <input
            type="text"
            v-model.lazy="user.name"
            required
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.name.$error }"
          />
          <div v-if="submitted && !$v.user.name.error" class="invalid-feedback">
            <span v-if="!$v.user.name.required">Name is required</span>
          </div>
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input
            type="password"
            v-model.lazy="user.password"
            required
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.password.$error }"
          />
          <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
            <span v-if="!$v.user.password.required">Password is required</span>
          </div>
        </div>
        <div class="form-group" id="alignlogin">
          <!-- <div class="flex-grow-1"></div> -->
          <button v-on:click.prevent="handleSubmit(e)" type="button" class="btn btn-primary">Login</button>
          <button v-on:click="navigateToRegister()" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {
        name: "",
        password: ""
      },
      credential: [],
      result: 1,
      submitted: "false",
      e: "",
      validUser: ""
    };
  },
  validations: {
    user: {
      name: { required },
      password: { required }
    }
  },
  methods: {
    get: function() {
      this.$http
        .post("http://localhost:3000/api/users/get", this.user)
        .then(function(data) {
          for (let i = 0; i < data.body.length; i++) {
            if (
              data.body[i].name == this.user.name &&
              data.body[i].password == this.user.password
            ) {
              this.result = 0;
              this.validUser = "true";
              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("userId", data.body[i].id);
              this.$router.push("/home");
              break;
            }
          }
          if (this.result == 1) {
            this.validUser = "false";
            // this.$router.push("/register");
          }
        });
    },
    navigateToRegister: function() {
      this.$router.push("/register");
    },
    handleSubmit: function(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.user.$touch();
      if (this.$v.user.$invalid) {
        return;
      }

      this.get();
    }
  }
};
</script>

<style scoped>
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

#login * {
  box-sizing: border-box;
}
#login {
  margin: 110px auto;
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
h2 {
  /* background: #eee; */
  /* border: 1px solid #bbb; */
}
.btn-primary {
  color: black;
  background-color: #56b9bd;
  border-color: #2e6da4;
}
.btn-primary:hover {
  color: #fff;
  background-color: #8d96a2;
  border-color: #0e0e0e;
}
#alignlogin {
  display: grid;
}
</style>
