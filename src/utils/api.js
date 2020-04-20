import { Message } from 'element-ui'
// 导入axios库
import axios from 'axios'

// 响应码的拦截
axios.interceptors.response.use(success => {
  // 业务错误
  if (success.status && success.status === 200 && success.data.status === 500) {
    Message.error({ message: success.data.msg })
    return
  }
  return success.data
}, error => {
  // 网络通信错误
  if (error.response.status === 504 || error.response.status === 404) {
    Message.error({ message: "服务器有问题" })
  } else if (error.response.status === 403) {
    Message.error({ message: "权限不足，请联系管理员" })
  } else if (error.response.status === 401) {
    Message.error({ message: "尚未登录，请登录" })
  } else {
    if (error.response.data.msg) {
      Message.error({ message: error.response.data.msg })
    } else {
      Message.error({ message: "未知错误" })
    }
  }
})

let base = ''
export const postKeyValueRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let i in data) {
        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
      }
      // console.log(ret);
      return ret
    }],
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}