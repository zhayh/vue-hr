<template>
  <div>
    <div style="margin-top: 10px; display: flex; justify-content: center">
      <el-input v-model="keywords" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                style="width: 400px; margin-right: 10px"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="hr-container">
      <el-card class="hr-card" v-for="(hr, index) in hrs" :key="index">
        <div slot="header" class="clearfix">
          <span>{{hr.name}}</span>
          <el-button style="float: right; padding: 3px 0; color: #ff0000" type="text" icon="el-icon-delete"></el-button>
        </div>
        <div>
          <div class="img-container">
            <img :src="hr.userface" :alt="hr.name" :title="hr.name" class="userface-img">
          </div>
          <div class="info-container">
            <div>用户名： {{hr.name}}</div>
            <div>手机号码： {{hr.phone}}</div>
            <div>电话号码： {{hr.telephone}}</div>
            <div>地址： {{hr.address}}</div>
            <div>用户状态：
              <el-switch v-model="hr.enabled" active-color="#13ce66" inactive-color="#ff4949"
                         active-text="启用" inactive-text="禁用"></el-switch>
            </div>
            <div>用户角色:
              <el-tag v-for="(role, rindex) in hr.roles" :key="rindex" type="success"
                      style="margin-right: 5px" size="mini">{{role.nameZh}}
              </el-tag>
              <el-button icon="el-icon-more" size="mini" type="text"></el-button>
            </div>
            <div>备注： {{hr.mark}}</div>
          </div>
        </div>
      </el-card>
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
  mounted () {
    this.initHrs()
  },
  methods: {
    async initHrs () {
      const resp = await this.getRequest('/system/hr/')
      if (resp) {
        this.hrs = resp.obj
      }
    }
  }
}
</script>

<style scoped>
  .hr-container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .hr-card {
    width: 350px;
    margin-bottom: 20px;
  }

  .img-container {
    display: flex;
    justify-content: center;
  }

  .img-container .userface-img {
    width: 72px;
    height: 72px;
    border-radius: 72px;
  }

  .info-container {
    margin: 20px 10px 0 10px;

  }

  .info-container div {
    margin-top: 4px;
    font-size: 12px;
    color: #0077aa;
  }
</style>
