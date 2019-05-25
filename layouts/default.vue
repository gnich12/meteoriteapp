<template>
  <div>
    <NavBar />
    <nuxt />
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      navigation: ''
    }
  }
}
</script>

<style>
</style>
