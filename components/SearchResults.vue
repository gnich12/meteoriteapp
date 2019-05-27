<template>
  <div class="dataTable">
    <template v-if="meteor.length !== 0">
      <b-table
      :data="meteor"
      :paginated="isPaginated"
      :per-page="perPage"
      @page-change="onPageChange"
      :current-page.sync="currentPage"
      style="border-top: solid purple; border-bottom:solid purple"
    >
      <template
        slot-scope="props"
      >
        <b-table-column
          field="name"
          label="Name"
        >
          {{ props.row.name }}
        </b-table-column>
        <b-table-column
          field="id"
          label="ID"
        >
          {{ props.row.id }}
        </b-table-column>
        <b-table-column
          field="nametype"
          label="Name Type"
        >
          {{ props.row.nametype }}
        </b-table-column>
        <b-table-column
          field="recclass"
          label="RecClass"
        >
          {{ props.row.recclass }}
        </b-table-column>
        <b-table-column
          field="mass"
          label="Mass (g)"
        >
          {{ Number(props.row.mass).toFixed(0) }}
        </b-table-column>
        <b-table-column
          field="fall"
          label="fall"
        >
          {{ props.row.fall }}
        </b-table-column>
        <b-table-column
          field="year"
          label="Year"
        >
          {{ new Date(props.row.year).getFullYear() }}
        </b-table-column>
        <b-table-column
          field="geolocation"
          label="Latitude"
        >
          {{ new Object(props.row.geolocation).latitude }}
        </b-table-column>
        <b-table-column
          label="Long"
        >
          {{ new Object(props.row.geolocation).longitude }}
        </b-table-column>
      </template>
    </b-table>
    </template>
    <template v-else>
       <section class="hero">
        <div class="hero-body">
          <div class="center">
            <h1 class="title has-text-danger">
              Sorry no Results!
            </h1>
          </div>
          <div class="center">
            <h2 class="subtitle">
              Try another meteor name....
            </h2>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    meteor: {
      type: Array
    },
    searchState: {
      type: Object
    }
  },
  computed: {
    dataLimit() {
      return this.$store.getters.getDataLimit
    },
    currentPage() {
      return this.$store.state.currentPage
    },
    maxDataLimit() {
      return this.$store.getters.getMaxDataLimit
    }
  },
  data() {
    return {
      isPaginated: true,
      perPage: 100,
      loading: false
    }
  },
  methods: {
    onPageChange(page) {
      if(this.dataLimit >= 1000) {
        if(page >= this.dataLimit/this.perPage) {
          this.page = page
          let newLimit = this.dataLimit + 1000
          this.$store.dispatch('callMeteor', {
              limit: newLimit,
              offset: 0,
              page: page
            })
        }
      } 
    }
  }
}
</script>

<style scoped>
.dataTable {
  margin-top: 1.5rem
}
.center {
display: flex;
justify-content: center;
align-items: center;
}
</style>
