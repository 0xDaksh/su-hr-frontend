<template>
  <div>
    <v-progress-circular indeterminate color="green" v-show="loading" :size="50" class="main"></v-progress-circular>
    <div v-show="error.is" class="main">
      <h2>{{error.whattosay}}</h2>
    </div>
    <div v-show="!loading && !error.is">
      // display hotels here!
    </div>
  </div>
</template>

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

<script>
  export default {
    name: 'Hotels',
    props: ['loggedIn', 'user'],
    data() {
      return {
        loading: true,
        error: {
          is: false,
          whattosay: ''
        },
        hotels: []
      }
    },
    methods: {
      getHotels() {
        this.$http.get(`//${this.api}/hotels`).then(data => {
          this.loading = false
          if(typeof data !== 'undefined' && typeof data.data !== 'undefined' && data.data.hotels !== null && typeof data.data.hotels.length !== 'undefined') {
            this.hotels = data.data.hotels
            console.log(this.hotels)
          } else {
            this.error.is = true
            this.error.whattosay = 'Cannot Fetch Hotels right now, Please Try again later? Please?!'
          }
        }).catch(e => {
          this.loading = false
          this.error.is = true
          this.error.whattosay = 'Cannot Fetch Hotels right now, Please Try again later? Please?!'
          console.error(e)
        })
      }
    },
    beforeMount() {
      setTimeout(() => {
        this.getHotels()
      }, 1000)
    }
  }
</script>
