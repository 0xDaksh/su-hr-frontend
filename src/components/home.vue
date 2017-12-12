<template>
  <div class="main">
    <div v-show="loggedIn">
      <h2>Thanks for Logging in, Please Use the Service Below: </h2>
      <router-link class="rlink" :to="{ path: 'hotels' }">
        <v-btn>Check Hotels</v-btn>
      </router-link>
    </div>
    <div v-show="!loggedIn" >
      <h2>Please Login to StayUncle to use it: </h2>
      <router-link class="rlink" :to="{ path: 'login' }">
        <v-btn>Login to StayUncle</v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['loggedIn', 'user']
}
</script>