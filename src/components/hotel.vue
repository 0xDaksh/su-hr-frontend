<template>
  <div>
    <div v-show="error.is">
      <div class="hotel-uncle">
        <h2 style="font-size: 50px;">{{error.text}}</h2>
      </div>
    </div>
    <div v-show="!error.is">
      <div id="hotel-img" :style="`background: url('${hotel.image}');`">

      </div>
      <div class="hotel-info">
        <h1>{{hotel.name}}</h1>
        <p>{{hotel.address}}</p>
        <h2>Rating: {{hotel.averageRating}}</h2>
        <v-btn large color="yellow darken-2" light class="elevation-10">BOOK IT TODAY</v-btn>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Hotel',
  props: ['loggedIn', 'user'],
  data() {
    return {
        hotel: {
          address: '',
          averageRating: '',
          name: '',
          image: ''
        },
        id: '',
        error: {
          is: false,
          text: ''
        }
    }
  },
  methods: {
    getData() {
      if(typeof this.$route.params.id !== 'undefined' && this.$route.params.id !== '') {
        this.id = this.$route.params.id
        this.$http.get(`//${this.api}/hotels/${this.id}`).then(res => {
          if(res.data.hotel !== null) {
            this.hotel = res.data.hotel
            console.log(this.hotel)
          } else {
            switch(res.data.error) {
              case 'server issue':
                this.error.text = 'Sorry an Error Occured, Try again later Please?!'
                this.error.is = true
                break
              case 'hotel not found':
                this.error.text = '404 Hotel Not Found.'
                this.error.is = true
                break
            }
          }
        }).catch(error => {
            this.error.text = '404 Hotel Not Found.'
            this.error.is = true
        })
      } else {
        this.error.text = '404 Hotel Not Found.'
        this.error.is = true
      }
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="stylus">
.center
  text-align: center
.hotel-uncle
  width: 80%
  margin: 0 auto
  display: flex
  flex-direction: column
  min-height: calc(100vh - 100px)
  @media screen and (max-width: 600px)
    min-height: calc(100vh - 92px)
  justify-content: center
  text-align: center
@import '../assets/stylus/hotel'
</style>
