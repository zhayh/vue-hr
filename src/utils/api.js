import { Message } from 'element-ui'
// 导入axios库
import axios from 'axios'
import router from '../router'

// 使用 axios发送请求的设置, 在发送请求之前做某件事
axios.interceptors.request.use(config => {
  // 设置以 form 表单的形式提交参数，如果以 JSON的形式提交表单，可忽略
  // if(config.method  === 'post'){
  //   // JSON 转换为 FormData
  //   const formData = new FormData()
  //   console.log(formData)
  //   Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
  //   config.data = formData
  // }
  // 将保存在 localStorage的 token添加到请求头
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token
  }
  return config
},error =>{
  Message.error("错误的传参", 'fail')
  return Promise.reject(error)
})

// 响应码的拦截
axios.interceptors.response.use(success => {
  if (success.status && success.status === 200 && success.data.status === 500) {
    Message.error({ message: success.data.msg })
    return
  }
  if (success.data.msg) {
    Message.success({ message: success.data.msg })
  }
  if(success.headers.authorization) {
    // 将 jwt认证的 token 保存在 localStorage 中
    window.localStorage.token = success.headers.authorization
  }
  return success.data
}, error => {
  if (error.response.status === 504 || error.response.status === 404) {
    Message.error({ message: '服务器有问题' })
  } else if (error.response.status === 403) {
    Message.error({ message: '权限不足，请联系管理员' })
  } else if (error.response.status === 401) {
    Message.error({ message: '尚未登录，请登录' })
    router.replace('/')
  } else {
    if (error.response.data.msg) {
      Message.error({ message: error.response.data.msg })
    } else {
      Message.error({ message: '未知错误' })
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

// 传递 json数据的 post请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params
  })
}
