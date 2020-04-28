<template>
  <div>
    <div style="margin-top: 10px; display: flex; justify-content: center">
      <el-input v-model="keywords" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                style="width: 400px; margin-right: 10px"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SysHr',
  data () {
    return {
      keywords: '',
      hrs: []
    }
  },
  methods: {
    initHr () {
      this.getRequest('')
    }
  }
}
</script>

<style scoped>

</style>
