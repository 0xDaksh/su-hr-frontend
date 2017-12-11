<template>
  <div class="fourofour">
    <h2 style="font-size: 80px;">404 NOT FOUND.</h2>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
.fourofour
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
