<template>
  <div>
    <div>
      <el-input size="small" class="input_type" placeholder="添加职位..."
        prefix-icon="el-icon-plus" @keydown.enter.native="addPosition" v-model="pos.name">
      </el-input>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addPosition">
        添加
      </el-button>
      <el-table :data="positions" stripe border type="small" style="width: 70%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="56"> </el-table-column>
        <el-table-column prop="id" label="编号" width="56"> </el-table-column>
        <el-table-column prop="name" label="职位名称" width="180"> </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="200"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="small" style="margin-top: 8px" @click="deleteMany"
                 :disabled="multipleSelection.length === 0">
        批量删除
      </el-button>
    </div>
    <el-dialog title="修改职位" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-tag>职位名称</el-tag>
        <el-input class="update_input" size="small" v-model="updatePos.name"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" >取 消</el-button>
        <el-button type="primary" @click="doUpdate" size="small" >确 定</el-button>
      </span>
    </el-dialog>
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
      positions: [],
      updatePos: {
        name: ''
      },
      dialogVisible: false,
      multipleSelection: []
    }
  },
  methods: {
    async initPositions () {
      const data = await this.getRequest('/system/basic/pos/')
      if (data) {
        this.positions = data.obj
      }
    },
    async addPosition () {
      if (this.pos.name) {
        const resp = await this.postRequest('/system/basic/pos/', this.pos)
        if (resp) {
          this.initPositions()
          this.pos.name = ''
        }
      } else {
        this.$message.error('职位名称不能为空')
      }
    },
    showEditDialog (index, data) {
      // this.updatePos = data
      Object.assign(this.updatePos, data)
      this.dialogVisible = true
    },
    async doUpdate() {
      const resp = await this.putRequest('/system/basic/pos/', this.updatePos)
      if (resp) {
        this.initPositions()
        this.updatePos.name = ''
        this.dialogVisible = false
      }
    },
    handleDelete (index, data) {
      this.$confirm('此操作将永久删除' + data.name + '职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/pos/' + data.id).then(resp => {
          this.initPositions()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    deleteMany() {
      this.$confirm('此操作将永久删除' + this.multipleSelection.length + '条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = "?"
        this.multipleSelection.forEach(item => {
          ids += "ids=" + item.id + '&'
        })
        this.deleteRequest('/system/basic/pos/' + ids).then(resp => {
          this.initPositions()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }
  },
  mounted () {
    this.initPositions()
  }
}
</script>

<style scoped>
  .input_type {
    width: 300px;
    margin-right: 8px;
    margin-bottom: 16px;
  }
  .update_input {
    width: 200px;
    margin-left: 8px;
  }
</style>
