<template>
  <div>
    <el-input
      size="small"
      class="input_type"
      placeholder="添加职位..."
      prefix-icon="el-icon-plus"
      v-model="pos.name">
    </el-input>
    <el-button type="primary" icon="el-icon-plus" size="small">添加</el-button>
    <el-table
      :data="positions"
      stripe
      border
      type="small"
      style="width: 70%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        width="56">
      </el-table-column>
      <el-table-column
        prop="name"
        label="职位名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Position',
  data () {
    return {
      pos: {
        name: ''
      },
      positions: []
    }
  }
}
</script>

<style scoped>
.input_type {
  width: 300px;
  margin-right: 8px;
  margin-bottom: 16px;
}
</style>
