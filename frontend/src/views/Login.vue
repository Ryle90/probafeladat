<template>
  <div>
    <form class="container" @submit="handleSubmit" novalidate>
      <h3>Login</h3>
      <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control">
          <input
            class="input"
            v-bind:class="{'is-danger': errorMessages.email !== ''}"
            type="text"
            v-model="email"
            id="email"
            name="email"
            @blur="handleValidation($event.target.name)"
            @focus="handleFocus($event)"
          />
          <small>{{errorMessages.email}}</small>
        </div>
      </div>
      <div class="field">
        <label class="label" for="">Password</label>
        <div class="control">
          <input
            class="input"
            v-bind:class="{'is-danger': errorMessages.password !== ''}"
            type="password"
            v-model="password"
            name="password"
            id="password"
            @blur="handleValidation($event.target.name)"
            @focus="handleFocus($event)"
          />
          <small>{{errorMessages.password}}</small>
        </div>
      </div>
      <button class="button is-link">Login</button>
    </form>
  </div>
</template>

<script>
import validateEmail from "../components/emailValidator.js";

export default {
  name: "login",

  data() {
    return {
      email: "",
      password: "",

      errorMessages: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    handleValidation(name) {
      const value = this[name];

      let isValid = true;
      let errorMessage = "";

      if (value.length === 0) {
        isValid = false;
        errorMessage = `Please type your ${name}`;
      } else if (name === "email") {
        if (!validateEmail(value)) {
          isValid = false;
          errorMessage = "Please type a valid email address";
        }
      }

      if (!isValid) {
        this.errorMessages = {
          ...this.errorMessages,
          [name]: errorMessage,
        };
      }

      return isValid
    },

    handleFocus(event) {
        this.errorMessages = {
            ...this.errorMessages,
            [event.target.name]: ''
        }
    },

    handleSubmit (event) {
        event.preventDefault();

        let isValidForm = true;

        Object.keys(this.errorMessages).forEach((name) => {
            if (this.handleValidation(name) == false) {
                isValidForm = false
            }
        })

        if (isValidForm) {
            console.log('valid')
        }
    }
  },
};
</script>

<style scoped>
.container {
  width: 50%;
  background-color: white;
  padding: 20px;
  margin-top: 10px;
  border-radius: 15px;
}
h3 {
  font-weight: bold;
  margin: 10px 0 20px;
}

small {
    color: red
}
</style>
