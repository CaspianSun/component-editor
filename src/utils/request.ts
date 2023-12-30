import axios, { AxiosRequestConfig, AxiosInstance, AxiosStatic } from 'axios'

const statusName = 'status'
const messageName = 'message'
const successCode = [200, 0, '200', '0']
const contentType = 'application/json'

interface MAxiosInstance extends AxiosInstance {
  <T = unknown, R = T extends BaseResponse ? T : BaseResponseWithData<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>
  <T = unknown, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
}

class MAxios {
  readonly axios: MAxiosInstance
  constructor(axios: AxiosStatic, config: AxiosRequestConfig) {
    this.axios = axios.create(config)
  }
  get<T = unknown>(config: AxiosRequestConfig) {
    return this.axios<T>({
      ...config,
      method: 'GET',
    })
  }
  post<T = unknown>(config: AxiosRequestConfig) {
    return this.axios<T>({
      ...config,
      method: 'POST',
    })
  }
  put<T = unknown>(config: AxiosRequestConfig) {
    return this.axios<T>({
      ...config,
      method: 'PUT',
    })
  }
  delete<T = unknown>(config: AxiosRequestConfig) {
    return this.axios<T>({
      ...config,
      method: 'DELETE',
    })
  }
  request<T = unknown>(config: AxiosRequestConfig) {
    return this.axios<T>(config)
  }
}

const service = new MAxios(axios, {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': contentType,
  },
})

service.axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
service.axios.interceptors.response.use(
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
  },
)

export default service
export const axiosInstance = service.axios
