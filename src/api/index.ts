import { request } from '/@/utils/request'

export const getPageModulesApi = () => {
  return request.get({
    url: '/api/pageModules',
    method: 'get',
  })
}

export const createPageModuleApi = (data: any) => {
  return request.post({
    url: '/api/pageModules',
    method: 'post',
    data,
  })
}

export const updatePageModuleApi = (id: string, data: any) => {
  return request.put({
    url: `/api/pageModules/${id}`,
    method: 'put',
    data,
  })
}

export const showPageModuleApi = (id: string) => {
  return request.get({
    url: `/api/pageModules/show/${id}`,
    method: 'get',
  })
}

export const deletePageModuleApi = (id: string | number) => {
  return request.delete<number>({
    url: `/api/pageModules/${id}`,
    method: 'delete',
  })
}
