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
    },
    searchState() {
      return this.$store.state.isSearch
    }
  },
  async fetch({ store }) {
    await store.dispatch("callMeteor",
     { limit: store.state.limit,
       offset: 0,
       page: 1
     }
    )
  }
}
</script>

<style>
</style>
