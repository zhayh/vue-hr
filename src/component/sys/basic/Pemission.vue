<template>
  <div>
    <div class="permission_input">
      <el-input placeholder="请输入角色英文名" v-model="role.name" size="small">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input v-model="role.nameZh" placeholder="请输入角色中文名" size="small"></el-input>
      <el-button type="primary" size="small" icon="el-icon-plus">添加角色</el-button>
    </div>
    <div class="permission_main">
      <el-collapse v-model="activeName" accordion size="small">
        <el-collapse-item title="一致性 Consistency" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pemission',
  data () {
    return {
      role: {
        name: '',
        nameZh: ''
      },
      activeName: ''
    }
  }
}
</script>

<style scoped>
  .permission_input {
    display: flex;
    justify-content: flex-start;
  }
  .permission_input .el-input {
    width: 300px;
    margin-right: 8px;
  }
  .permission_main {
    margin-top: 10px;
    width: 700px
  }
</style>
