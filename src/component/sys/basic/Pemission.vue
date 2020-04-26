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
        <el-collapse-item :title="item.nameZh" :name="item.id" v-for="(item, index) in roles" :key="item.id">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button style="float: right; padding: 3px 0; color: #ff0000" icon="el-icon-delete"></el-button>
            </div>
            <div>

            </div>
          </el-card>
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
      activeName: '',
      roles: []
    }
  },
  mounted () {
    this.initRoles()
  },
  methods: {
    initRoles () {
      this.getRequest('system/basic/permiss/').then(resp => {
        if (resp) {
          this.roles = resp.obj
        }
      })
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
