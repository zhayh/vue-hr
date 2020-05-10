<template>
  <div style="width: 500px">
    <el-input
      size="small"
      placeholder="请输入部门名称"
      prefix-icon="el-icon-search"
      v-model="filterText">
    </el-input>

    <el-tree
      :data="departments"
      :props="defaultProps"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }"
            style="display: flex; justify-content: space-between; width: 100%">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            class="dep_btn"
            type="primary"
            size="mini"
            @click="() => showAddView(data)">
            添加部门
          </el-button>
          <el-button
            class="dep_btn"
            type="danger"
            size="mini"
            @click="() => deleteDep(data)">
            删除部门
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
      title="添加部门"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <div>
          <el-tag size="small">上级部门</el-tag>
          <span style="margin-left: 8px">{{pname}}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 10px">
          <el-tag size="small">部门名称</el-tag>
          <el-input v-model="department.name" placeholder="请输入部门名称" size="mini"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addDepartment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data () {
    return {
      filterText: '',
      departments: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false,
      department: {
        name: '',
        parentId: -1
      },
      pname: ''
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted () {
    this.initDepartments()
  },
  methods: {
    init () {
      this.department = {
        name: '',
        parentId: -1
      }
      this.pname = ''
    },
    showAddView (data) {
      this.dialogVisible = true
      this.pname = data.name
      this.department.parentId = data.id
    },
    addDepartment () {
      if (this.department.name === '') {
        this.$message.error('输入不能为空')
        return;
      }
      this.postRequest('/system/basic/department/', this.department).then(resp => {
        if (resp) {
          this.addDept2Depts(this.departments, resp.obj)
          this.init()
          this.dialogVisible = false
        }
      })
    },
    addDept2Depts (depts, dept) {
      depts.forEach(d => {
        if (d.id === dept.parentId) {
          d.children = d.children.concat(dept)
        } else {
          this.addDept2Depts(d.children, dept)
        }
      })
    },
    deleteDep (data) {
      if(data.isParent) {
        this.$message.error("父部门删除失败")
        return
      }
      this.$confirm('此操作将永久删除' + data.name + '部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.deleteRequest('/system/basic/department/' + data.id)) {
          this.removeDeptFromDepts(this.departments, data.id)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    removeDeptFromDepts(depts, id) {
      for (let i = 0; i < depts.length; i++) {
        let dept = depts[i]
        if (id === dept.id) {
          depts.splice(i, 1)
          return
        } else {
          this.removeDeptFromDepts(dept.children, id)
        }
      }
    },
    handleClose () {

    },
    async initDepartments () {
      let resp = await this.getRequest('/system/basic/department/')
      if (resp) {
        this.departments = resp.obj
      }
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  }
}
</script>

<style scoped>
  .dep_btn {
    padding: 2px;
  }
</style>
