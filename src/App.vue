<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app dark overlay temporary enable-resize-watcher overflow style="color: #fff;">
      <section class="userinfo">
        <img id="updIm" src="https://dontgetserious.com/wp-content/uploads/2016/04/StayUncle.Com-Lets-Unmarried-Indian-Couples-Book-Hotel-Rooms-Without-Being-Harassed.jpg" style="width: 100%;">
        <span>StayUncle</span>
      </section>
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          active-class="active"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <div class="sidefooter">
        <span>&copy; 2017 <a href="/">StayUncle</a></span>
        <span>Designed and Developed By <a href="//dak.sh">Daksh</a>.</span>
      </div>
    </v-navigation-drawer>
    <v-toolbar fixed app dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>

          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<style lang="stylus">
  @import './assets/stylus/app.styl'
</style>

<script>
  export default {
    data () {
      return {
        drawer: false,
        items: [
        {
          icon: 'home',
          title: 'Home',
          to: '/'
        },
      {
          icon: 'business',
          title: 'Hotels',
          to: '/hotels'
      }
    ],
        title: 'StayUncle'
      }
    },
    mounted() {
      
    }
  }
</script>
