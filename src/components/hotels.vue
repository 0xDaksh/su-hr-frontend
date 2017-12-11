<template>
  <div>
    <v-progress-circular indeterminate color="green" v-show="loading" :size="50" class="main"></v-progress-circular>
    <div v-show="error.is" class="main">
      <h2>{{error.whattosay}}</h2>
    </div>
    <div v-show="!loading && !error.is">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-media
            class="white--text"
            height="200px"
            src="/static/doc-images/cards/docks.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Top 10 Australian beaches</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title>
            <div>
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

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
    mounted() {
      setTimeout(() => {
        console.log('y?')
        this.getHotels()
      }, 500)
    }
  }
</script>
