<template>
  <div>
    <el-container>
      <el-header class="home_header">
        <div class="title">微人事</div>
        <el-dropdown class="user_info" @command="commandHandler">
          <span class="el-dropdown-link">
            {{user.name}}<i><img :src="user.userface" alt=""></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边栏导航菜单 -->
          <el-menu router unique-opened>
            <el-submenu :index="index.toString()" v-for="(item, index) in routes"
                        v-if="!item.hidden" :key="index">
              <template slot="title">
                <i :class="item.iconCls" style="color: #4186b3; margin-right: 8px"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item :index="child.path" v-for="(child, subIndex) in item.children"
                            :key="subIndex">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 导航面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right"
                         v-if="this.$router.currentRoute.path !== '/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="home_welcome" v-else>欢迎来到微人事</div>
          <router-view class="home_main"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  computed: {
    routes () {
      return this.$store.state.routes;
    }
  },
  methods: {
    commandHandler (cmd) {
      if (cmd === 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest('/logout')
          // 1. 移除storage存储的数据
          window.sessionStorage.removeItem('user')
          // 2. 路由跳转到首页
          this.$router.replace('/')
          // 3. 清空 store存储的菜单信息
          this.$store.commit('initRoutes', [])
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }
  }
}
</script>

<style scoped>
  .home_header {
    background: #4078aa;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
  }

  .home_header .title {
    font-size: 30px;
    font-family: 思源黑体, serif;
    color: #ffffff;
  }

  .home_header .user_info {
    cursor: pointer;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
    color: #eeeeee;
  }

  .el-dropdown-link img {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    margin-left: 8px;
  }
  .home_welcome {
    text-align: center;
    font-size: 30px;
    color: #4078aa;
    padding-top: 50px;
  }
  .home_main {
    margin-top: 16px;
  }
</style>
