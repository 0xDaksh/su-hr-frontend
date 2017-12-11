<template>
  <div style="width: 66%;">
    <div v-show="!loggedIn">
      <div class="text-xs-center">
        <v-btn round color="blue" dark @click="changeType">{{text}}</v-btn>
      </div>
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
        ></v-text-field>
        <div class="text-xs-center">
          <v-btn large color="red" dark>{{ !login ? "Sign-Up!" : "Login!"  }}</v-btn>
        </div>
      </v-form>
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
          login: true,
          valid: false,
          name: '',
          text: 'New to StayUncle, Signup?',
          nameRules: [
            (v) => !!v || 'Name is required',
            (v) => v.length <= 10 || 'Name must be less than 10 characters'
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
      }
    }
}
</script>

<style lang="stylus">
</style>
