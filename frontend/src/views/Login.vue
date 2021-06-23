<template>
  <div>
    <form class="container" @submit="handleSubmit" novalidate>
      <h3>Login</h3>
      <div class="field">
        <label class="label" for="email">User</label>
        <div class="control">
          <input
            class="input"
            v-bind:class="{'is-danger': errorMessages.user !== ''}"
            type="text"
            v-model="user"
            id="user"
            name="user"
            @blur="handleValidation($event.target.name)"
            @focus="handleFocus($event)"
          />
          <small>{{errorMessages.user}}</small>
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
        <div>
          <small>{{responseError}}</small>
        </div>
    </form>
  </div>
</template>

<script>

export default {
  name: "login",

  data() {
    return {
      user: "",
      password: "",

      errorMessages: {
        user: "",
        password: "",
      },

      responseError: ""
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
            const data = {
                user: this.user,
                password: this.password
            }

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
              if (response.status === 401) {
                this.responseError = 'An error occured, please try it again.'
                setTimeout(() => {
                  this.responseError = ''
                }, 2000)
              } else {
                response.json()
                .then(resData => {
                  const token = resData.token;
                  window.localStorage.setItem('token', token)
                  this.$router.push('/data')
                })
              }
            })
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
