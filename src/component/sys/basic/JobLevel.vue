<template>
  <div>
    <div>
      <el-input v-model="job.name" placeholder="添加职称..." size="small" class="input_type"
                prefix-icon="el-icon-plus">
      </el-input>
      <el-select v-model="job.titlelevel" placeholder="请选择" size="small" class="select_type">
        <el-option v-for="item in titleLevels" :key="item"
          :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" size="small">
        添加
      </el-button>
    </div>
    <div style="margin-top: 8px">
      <el-table :data="jobLevels" stripe border type="small" style="width: 60%">
        <el-table-column type="selection" width="56"> </el-table-column>
        <el-table-column prop="id" label="编号" width="56"> </el-table-column>
        <el-table-column prop="name" label="职称名称" width="150"> </el-table-column>
        <el-table-column prop="titlelevel" label="职称级别" width="150"> </el-table-column>
        <el-table-column prop="createdate" label="创建时间" width="200"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" >编辑</el-button>
            <el-button size="mini" type="danger" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobLevel',
  data () {
    return {
      job: {
        name: '',
        titlelevel: ''
      },
      titleLevels: [
        '正高级',
        '副高级',
        '中级',
        '初级',
      ],
      jobLevels: []
    }
  }
}
</script>

<style scoped>
  .input_type {
    width: 300px;
    margin-right: 8px;
  }
  .select_type {
    width: 200px;
    margin-right: 8px;
  }
</style>
