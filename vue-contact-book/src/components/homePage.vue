<template>
  <div>
    
    <div class="header">
      <a class="logo">Contact-book</a>
      <div class="header-right">
        <router-link to="/addContact">Add Contact</router-link>
        <a v-on:click="logout">Logout</a>
        <input type="text" v-model="search" placeholder="search contact" />
      </div>
    </div>
    <br />
    <div class="main">
      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Option</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="contact in filteredContacts">
              <td>
                <strong class="contact-name">{{contact.name}}</strong>
              </td>
              <td>{{contact.contact}}</td>
              <td>{{contact.email}}</td>
              <td>{{contact.city}}</td>
              <td>
                <button class="btn-c" v-on:click="deleteContact(contact.id)">
                  <i class="fa fa-trash"></i>
                </button>
                <button class="btn-c" v-on:click="editContact(contact.id,contact.name,contact.contact,contact.email,contact.city)">
                  <i class="fa fa-edit"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  data() {
    return {
      contacts: [],
      search: "",
      checkstring:'',checksearch:'',userid:""
    };
  },
  methods: {
    logout: function() {
      // localStorage.setItem("isLoggedIn", "false");
      localStorage.clear();
      this.$router.push("/");

    },
    getContacts: function() {
      let body={
        userId:localStorage.getItem("userId")
      }
      this.$http
        .post("http://localhost:3000/api/contact/get",body)
        .then(function(data) {
           console.log(data.body);
          this.contacts = data.body;
        });
    },
    deleteContact: function(id) {
      let dataToBeDelete = {
        contactId: id,
        userId: localStorage.getItem("userId")
      };
      this.$http
        .post("http://localhost:3000/api/contact/delete", dataToBeDelete)
        .then(function(data) {
          console.log(data)
          this.getContacts();
        });
    },
    editContact: function(id,name,phone,mail,address) {
      localStorage.setItem("contactId", id);
      localStorage.setItem('contactName',name);
      localStorage.setItem('contactPhone',phone);
      localStorage.setItem('contactMail',mail);
      localStorage.setItem('contactAdd',address);
      this.$router.push("/editContact");
    }
  },

  created() {
    this.userid=localStorage.getItem('userId');
    this.getContacts();
    
  },
  computed: {
    filteredContacts: function() {
      return this.contacts.filter(contact => {
        this.checkstring = contact.name.toUpperCase();
        this.checksearch = this.search.toUpperCase();
        return this.checkstring.match(this.checksearch);
        // return contact.name.match(this.search);
      });
    }
  },
  mounted() {
    //stop user to login twice
    window.onpopstate = event => {
      if (
        window.localStorage.getItem("isLoggedIn") !== null &&
        this.$route.path == "/"
      ) {
        this.$router.push("/home"); // redirect to home, for example
      }
    };
  }
};
</script>

<style scoped>
.header {
  overflow: hidden;
  background-color: #56b9bd;
  padding: 20px 10px;
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
  background-color: #ddd;
  color: black;
}

/* Style the active/current link*/
.header a.active {
  background-color: dodgerblue;
  color: white;
}

/* Float the link section to the right */
.header-right {
  float: right;
}

.header input[type="text"] {
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  .header-right {
    float: none;
  }
}

.main {
  margin-left: 160px; /* Same as the width of the sidenav */
  font-size: 28px; /* Increased text to enable scrolling */
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

table {
  border-collapse: separate;
  border-spacing: 0;
  color: #4a4a4d;
  font: 14px/1.4 "Helvetica Neue", Helvetica, Arial, sans-serif;
  width: 90%;
}
th,
td {
  padding: 10px 15px;
  vertical-align: middle;
}
thead {
  background-color: #56b9bd;

  background: linear-gradient(#56b9bd, #56b9bd);
  color: #fff;
  font-size: 11px;
  text-transform: uppercase;
}
th:first-child {
  border-top-left-radius: 5px;
  text-align: left;
}
th:last-child {
  border-top-right-radius: 5px;
}
tbody tr:nth-child(even) {
  background: #f0f0f2;
}
td {
  border-bottom: 1px solid #cecfd5;
  border-right: 1px solid #cecfd5;
}
td:first-child {
  border-left: 1px solid #cecfd5;
}

.fa {
  color: #56b9bd;
  border: transparent;
  border-color: none;
  outline: none;
  padding: 0;
  cursor: pointer;
}
.book-title {
  color: #395870;
  display: block;
}
</style>
