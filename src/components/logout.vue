<template lang="html">
  <div>
    <div v-show="loggedIn">
      <v-progress-circular indeterminate color="green" :size="50" class="main"></v-progress-circular>
    </div>
    <div v-show="!loggedIn">
      <h2 class="text-xs-center">Yolo, You need to login to Logout Uncle / Aunty !</h2>
      <div class="text-xs-center">
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
