<template>
  <el-container>
  </el-container>
</template>

<script>
export default {
  name: 'PitSelectorIndex',
  data () {
    return {
      pits: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initPit()
    })
  },
  methods: {
    initPit () {
      this.$axios
        .post('/getPit', {
          plantId: this.$parent.$utils.getUrlKey('plantId')
        })
        .then(resp => {
          if (resp && resp.code === 200) {
            console.log(resp)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
