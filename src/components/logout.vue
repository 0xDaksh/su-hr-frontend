<template lang="html">
  <div class="logout-uncle">
    <div v-show="loggedIn">
      <v-progress-circular indeterminate color="green" :size="50" class="main"></v-progress-circular>
    </div>
    <div v-show="!loggedIn">
      <h2 class="center">Yolo, You need to login to Logout Uncle / Aunty !</h2>
      <div class="center">
        <v-btn large color="red" dark @click="$router.push('/')">Go Back Home!</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loggedIn'],
  mounted() {
    this.$http.get(`//${this.api}/logout`, {withCredentials: true}).then(json => {
      if(json.data.loggedOut) {
        setTimeout(() => {
          window.location = '/'
        }, 500)
      }
    })
  }
}
</script>
<style lang="stylus">
.center
  text-align: center
.logout-uncle
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
