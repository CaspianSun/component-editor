import axios, { AxiosRequestConfig, AxiosInstance, AxiosStatic } from 'axios'
import config from '@/config/index'

const { baseUrl, statusName, successCode, messageName } = config

class MyAxios {
  readonly axios: AxiosInstance

  constructor(axios: AxiosStatic, config: AxiosRequestConfig) {
    this.axios = axios.create(config)
  }
  request<T = unknown, R = T, D = unknown>(config: AxiosRequestConfig<D>): Promise<R> {
    return this.axios.request<T, R, D>(config)
  }
}

const request = new MyAxios(axios, {
  baseURL: baseUrl,
  timeout: 10000
})

request.axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
request.axios.interceptors.response.use(
  (response) => {
    const { data, status } = response
    let code = data && data[statusName] ? data[statusName] : status
    if (successCode.includes(code)) code = 200
    switch (code) {
      case 200:
        return Promise.resolve(data)
      default:
        return Promise.reject(new Error(data[messageName]))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
