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

<style lang="stylus">
  a
    text-decoration none
  .main
    width: 80%
    margin: 0 auto
    display: flex
    flex-direction: column
    min-height: calc(100vh - 100px)
    @media screen and (max-width: 600px)
      min-height: calc(100vh - 92px)
    justify-content: center
    text-align: center
</style>
