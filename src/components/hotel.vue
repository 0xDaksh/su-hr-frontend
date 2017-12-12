<template>
  <div>
	<div v-show="!error.is && loading" class="main">
		<v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
	</div>
    <div v-show="error.is">
      <div class="hotel-uncle">
        <h2 style="font-size: 50px;">{{error.text}}</h2>
      </div>
    </div>
    <div v-show="!loading && !error.is">
      <div id="hotel-img" :style="`background: url('${hotel.image}');`">

      </div>
      <div class="hotel-info">
        <h1>{{hotel.name}}</h1>
        <p>{{hotel.address}}</p>
		<h3 style="font-size: 30px;">Price: ₹{{hotel.price}}</h3>
        <h2>Rating: {{hotel.averageRating}}</h2>
        <v-btn large color="yellow darken-2" light class="elevation-10" @click="book" v-show="loggedIn">BOOK IT TODAY</v-btn>
      </div>
      <v-snackbar
        :timeout="error.timeout"
        bottom
        multi-line
        v-model="snack.show"
      >
        {{snack.text}}
      <v-btn flat color="pink" @click.native="snack.show = false">Close</v-btn>
    </v-snackbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hotel',
  props: ['loggedIn', 'user'],
  data() {
    return {
		loading: true,
        hotel: {
          address: '',
          averageRating: '',
          name: '',
          image: ''
		},
        id: '',
        error: {
          timeout: 15000,
          is: false,
          text: ''
        },
        snack: {
			show: false,
			text: ''
		}
    }
  },
  socket: {
	  events: {
		  returnBooking(val) {
			  this.snack.text = "The Hotel Has Been Booked, Please Check your Wallet for any other Clarifications."
			  this.snack.show = true
		  },
		  err(er) {
			  switch(er) {
				  case 'server-issue':
					this.error.text = 'Theres been an issue, Please Try again later!'
					break;
				  case 'no-money':
					this.snack.text = 'Sorry, you do not have enough balance. Please Recharge.'
					return this.snack.show = true
					break;
				  case 'no-such-hotel':
					this.error.text = 'No, Such hotel exists? are you sure you are at the right place?'
					break;
			  }
			  this.error.is = true
		  }
	  }
  },
  methods: {
    book() {
		this.$socket.emit('bookHotel', this.id)
    },
    getData() {
      if(typeof this.$route.params.id !== 'undefined' && this.$route.params.id !== '') {
        this.id = this.$route.params.id
        this.$http.get(`//${this.api}/hotels/${this.id}`).then(res => {
          if(res.data.hotel !== null) {
            this.hotel = res.data.hotel
			setTimeout(() => {
				this.loading = false
			}, 500)
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
