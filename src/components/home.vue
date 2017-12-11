<template>
  <div>
    <div v-show="loggedIn" class="main">
      <h2>Thanks for Logging in, Please Use the Service Below: </h2>
      <router-link class="rlink" :to="{ path: 'hotels' }">
        <v-btn>Check Hotels</v-btn>
      </router-link>
    </div>
    <div v-show="!loggedIn" class="main">
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
    display flex
    flex-direction column
    justify-content center
    align-items center
    text-align center
    min-height calc(100vh - 55px)
    margin 0 25px
</style>
