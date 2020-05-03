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
                         active-text="启用" inactive-text="禁用" @change="changeEnabled(hr)"></el-switch>
            </div>
            <div>用户角色:
              <el-tag v-for="(role, rindex) in hr.roles" :key="rindex" type="success"
                      style="margin-right: 5px" size="mini">{{role.nameZh}}
              </el-tag>
              <el-popover placement="right" title="角色列表" width="200" trigger="click"
                          @show="showPop(hr)" @hide="hidePop(hr)">
                <el-select v-model="selectedRoles" placeholder="请选择" size="mini" multiple>
                  <el-option v-for="(role, indexj) in allRoles" :key="indexj" :label="role.nameZh"
                    :value="role.id"> </el-option>
                </el-select>
                <el-button slot="reference" icon="el-icon-more" size="mini" type="text"></el-button>
              </el-popover>

            </div>
            <div>备注： {{hr.remark}}</div>
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
      hrs: [],
      allRoles: [],
      selectedRoles: []
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
    },
    async changeEnabled(hr) {
      console.log(hr)
      const resp = await this.putRequest('/system/hr/status', hr)
      if(resp) {
        this.initHrs()
      }
    },
    async initAllRoles() {
      const resp = await this.getRequest('/system/hr/roles')
      if(resp) {
        this.allRoles = resp.obj
      }
    },
    showPop(hr) {
      this.initAllRoles()
      this.selectedRoles = []
      hr.roles.forEach(role => {
        this.selectedRoles.push(role.id)
      })
    },
    hidePop(hr) {
      let roles = [];
      // 比较新选项与已选项是否一致
      // Object.assign(roles, hr.roles);
      let flag = false;
      if(hr.roles.length !== this.selectedRoles.length) {
        flag = true
      } else {
        // 获取新选项与已选项的差集，不为零则更新
        let tmp = new Set(this.selectedRoles)
        flag = new Set([...hr.roles].filter(role => !tmp.has(role.id))).size
      }
      // flag为true，则发送更新用户角色的请求
      if (flag) {
        let url = '/system/hr/roles?hrid=' + hr.id;
        this.selectedRoles.forEach(sr => {
          url += '&rids=' + sr;
        });
        this.putRequest(url).then(resp => {
          if (resp) {
            this.initHrs();
          }
        });
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
