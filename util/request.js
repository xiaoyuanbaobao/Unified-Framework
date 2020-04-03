import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 30000, // 请求超时时间
    withCredentials:true,  // 访问权限 
})

export default service