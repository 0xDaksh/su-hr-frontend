<template>
	<div>
		<div v-show="error.is || !loggedIn" class="main">
			<h2>{{error.text}}</h2>
		</div>
		<v-container grid-list-md text-xs-center v-show="loggedIn && !error.is">
			<h2>Welcome to Your Wallet</h2>
			<v-layout row wrap>
				<v-flex xs12>
					<v-card dark color="light-green darken 3">
						<v-card-text class="px-0" style="font-size: 1em;">
							Wallet Operations and Status
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs6>
					<v-card dark color="red">
						<v-card-text class="px-0">
							Details
						</v-card-text>
					</v-card>
					<div style="padding-top: 1%;">
						<h3 style="font-size: 30px;">Name: {{user.name}}</h3>
						<h3 style="font-size: 30px;">Balance: ₹{{balance}}</h3>
					</div>
				</v-flex>
				<v-flex xs6>
					<v-card dark color="blue">
						<v-card-text class="px-0">
							Operations
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12>
					<v-card dark color="dark">
						<v-card-text class="px-0">
							Your Earlier Visits
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
export default {
  props: ['loggedIn', 'user'],
  data() {
	  return {
		  error: {
			  is: false,
			  text: 'Please Login to Access the Wallet.'
		  },
		  balance: 0
	  }
  },
  methods: {
	  getWalletBal() {
		  this.$socket.emit('walletBalance')
	  }
  },
  mounted() {
	  this.getWalletBal()
  },
  socket: {
	  events: {
		  returnWalletBalance(amt) {
			  this.balance = amt
		  }
	  }
  }
}
</script>


<style lang="stylus">
h2
	font-size 4em
</style>