<template>
  <section
    class="section"
  >
    <div
      class="container is-fullheight"
    >
      <SearchBar />
      <SearchResults :meteor="meteorData" /> 
    </div>
  </section>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'
export default {
  components: {
    SearchBar,
    SearchResults
  },
  computed: {
    meteorData() {
      return this.$store.state.meteors
    },
    resultSearch() {
      return this.$store.getters.getNoResult
    }
  },
  async fetch({ store }) {
    await store.dispatch("callMeteor",
     { limit: store.state.limit,
       offset: 0
     }
    )
  }
}
</script>

<style>
/* *:not(path):not(g) {
color: hsla(210, 100%, 100%, 0.9) !important;
background: hsla(210, 100%,  50%, 0.5) !important;
outline: solid 0.25rem hsla(210, 100%, 100%, 0.5) !important;
box-shadow: none !important;
} */
</style>
