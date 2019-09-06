<template>
<div>
   <div class="header">
     <router-link to="/home"  class="logo">Contact-book</router-link>
    </div>
  <div id="add-contact">
    <h2>Add Contact</h2>
    <form>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" v-model.lazy="contactt.name"  class="form-control" :class="{ 'is-invalid':submitted && $v.contactt.name.$error }" />
         <div v-if=" !$v.contactt.name.error" class="invalid-feedback">
          <span v-if="!$v.contactt.name.required">Name is required</span>
          <span v-if="!$v.contactt.name.minLength">Name must be at least 3 characters</span>
          <span v-if="!$v.contactt.name.maxLength">Name can't be more than 20 charcters</span>
        </div>
      </div>
      <div class="form-group">
        <label>Contact Number:</label>
        <input type="text" v-model.lazy="contactt.contact"  class="form-control" :class="{ 'is-invalid':submitted && $v.contactt.contact.$error }" />
        <div v-if="!$v.contactt.contact.error" class="invalid-feedback">
          <span v-if="!$v.contactt.contact.required">contact is required</span>
          <span v-if="!$v.contactt.contact.alpha">contact must valid</span>
        </div>
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model.lazy="contactt.email" class="form-control" :class="{ 'is-invalid':submitted && $v.contactt.email.$error }" />
        <div v-if="$v.contactt.email.$error" class="invalid-feedback">
          <span v-if="!$v.contactt.email.required">Email is required</span>
          <span v-if="!$v.contactt.email.email">Email is invalid</span>
        </div>
      </div>
      <div class="form-group">
        <label>Address:</label>
        <input type="text" v-model.lazy="contactt.city" class="form-control" />
      </div>
      <div class="form-group" id="alignlogin">
        <button  v-on:click.prevent="handleSubmit(e)" class="btn btn-primary">Add Contact</button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import { bus } from '../main';
import { required, email, minLength, maxLength,helpers } from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/)

export default {
  data() {    
    return {
      contactt: {
        name: "",
        contact: "",
        email: "",
        city: "",
        userid:""  
      },
      e:"",
      submitted: false    
    };
  },
  validations: {
    contactt: {
      name: { required ,minLength: minLength(3),maxLength: maxLength(20) },
      email: { required, email },
      contact:{required,alpha},
      city: { }
    }
  },
  methods: {
    addContact: function() {
      console.log("add contact called");
      this.$http
        .post("http://localhost:3000/api/contact/post",this.contactt).then(function(data) {
           this.$router.push("/home");
        });
    },

    handleSubmit:function(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.contactt.$touch();
      if (this.$v.contactt.$invalid) {
        return;
      }
      this.addContact()    
    }  

  },
  created(){
    this.contactt.userid= localStorage.getItem('userId');
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


#add-contact * {
  box-sizing: border-box;
}
#add-contact {
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
