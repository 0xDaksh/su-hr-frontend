<template>
  <div style="width: 66%;">
    <div v-show="!loggedIn">
      <div class="text-xs-center">
        <v-btn round color="blue" dark @click="changeType">{{text}}</v-btn>
      </div>
      <v-snackbar
        :timeout="error.timeout"
        bottom
        multi-line
        v-model="error.is"
      >
      {{ error.text }}
      <v-btn flat color="pink" @click.native="error.is = false">Close</v-btn>
    </v-snackbar>
      <v-form v-model="valid">
        <v-text-field
          v-if="!login"
          label="Name"
          v-model="name"
          :rules="nameRules"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="E-mail"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          required
          type="password"
          :rules="passwordRules"
          @keyup.enter="submit"
        ></v-text-field>
        <div class="text-xs-center">
          <v-btn large color="red" dark @click="submit">{{ !login ? "Sign-Up!" : "Login!"  }}</v-btn>
        </div>
      </v-form>
    </div>
    <div v-show="loggedIn">
        <h2 class="text-xs-center">Yolo, You're already logged In Uncle / Auntie!</h2>
        <div class="text-xs-center">
          <v-btn large color="red" dark @click="$router.push('/')">Go Back Home!</v-btn>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: ['loggedIn', 'user'],
  data () {
        return {
          password: '',
          error: {
            is: false,
            value: '',
            timeout: 15000
          },
          login: true,
          valid: false,
          name: '',
          text: 'New to StayUncle, Signup?',
          nameRules: [
            (v) => !!v || 'Name is required',
            (v) => v.length <= 10 || 'Name must be less than 10 characters'
          ],
          passwordRules: [
            (p) => !!p || 'Password is Required',
            (p) => p.length >= 7 || "Password must be more than 7 characters."
          ],
          email: '',
          emailRules: [
            (v) => !!v || 'E-mail is required',
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
          ]
        }
    },
    methods: {
      changeType() {
        if(this.login == true) {
          this.login = false
          this.text = 'Used StayUncle Before? Login Back Again!'
          return
        }

        this.login = true
        this.text = "New to StayUncle, Signup?"
        return
      },
      submit() {
        if(this.valid) {
          switch(this.login) {
            case true:
              this.$http.post(`//${this.api}/login`, {
                email: this.email,
                password: this.password
              }, {withCredentials: true}).then(data => {
                if(typeof data.data !== 'undefined' && data.data.user !== null && data.data.error !== "please provide email and password") {
                  window.location = '/'
                } else {
                  this.error.text = 'It seems like you used an incorrect email and password pair.'
                  this.error.is = true
                }
              }).catch(err => {
                this.error.text = 'Please Try again later, there has been an issue!'
                this.error.is = true
              })
              break;
            case false:
              this.$http.post(`//${this.api}/signup`, {
                name: this.name,
                email: this.email,
                password: this.password
              }, {withCredentials: true}).then(data => {
                if(typeof data.data !== 'undefined' && data.data.user !== null && data.data.error === null) {
                  window.location = '/'
                } else {
                  switch(data.data.error) {
                    case 'anotheraccount':
                      this.error.text = 'Another account with same email exists, please use a different email.'
                      this.error.is = true
                      break
                    case 'please provide email and password':
                      this.error.text = 'Please fill in the details correctly.'
                      this.error.is = true
                      break;
                  }
                }
              }).catch(err => {
                this.error.text = 'Please Try again later, there has been an issue!'
                this.error.is = true
              })
              break;
          }
        } else {
          this.error.text = 'Please Fill in the Details Correctly.'
          this.error.is = true
        }
      }
    }
}
</script>

<style lang="stylus">
</style>
