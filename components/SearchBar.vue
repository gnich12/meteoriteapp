<template>
  <div>
      <div class="center">
    <b-field
      is-large
    >
      <b-input
        v-model="search"
        placeholder="Search for a Meteorite"
        type="search"
        icon="magnify"
        @focus="resetFocus"
      />
      <b-button
        type="is-info"
        @click="runQuery"
      >
        Search
      </b-button>
    </b-field>
    
  </div>
  <div class="center has-text-center" style="margin-top:20px" >
    <span class=" icon is-small has-text-danger has-text-weight-bold is-fullwidth"
      style="width:500px"
      v-if="validationMessage.length !== 0">
      <i class="fas fa-exclamation-triangle" sytle="margin-right:10px"></i>&nbsp;&nbsp;
      {{ validationMessage }}
    </span>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      validationMessage: '',
      focusState: false
    }
  },
  watch:{
    search () {
      if (this.search === '') {
        this.$store.dispatch('callMeteor', {
          limit: 1000,
          offset: 0,
          page: 1
        })
      }
    }
  },
  methods: {
    resetFocus() {
      this.focusState = true
    },
    runQuery() {
      if (this.search === '') {
        this.validationMessage = 'Hold On! Please type a meteor name!'
        setTimeout(() => {
          this.validationMessage = ''
          this.focusState = false
        }, 5000)  
      } else {
        if (this.validator(this.search)) {
          this.$store.dispatch('searchMeteor',
          {
            query:`$where=upper(name) like upper('%25${this.search}%25')`
          })
        } else {
          this.validationMessage = 'Invalid search term!!! please try again!'
          setTimeout(() => {
            this.validationMessage = ''
            this.focusState = false
          }, 5000)  
        }
      }
    },
    validator(term) {
      let patt = /^\w+( +\w+)*$/
      if (term === '' || patt.test(term) === false) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style scoped>
.center {
display: flex;
justify-content: center;
align-items: center;
}
</style>
