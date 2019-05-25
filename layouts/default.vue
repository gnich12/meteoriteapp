<template>
  <div>
    <NavBar />
    <nuxt />
  </div>
</template>
<script>
import NavBar from '@/components/Navbar'
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
