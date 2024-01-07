import { request } from '../utils/request'

export const getPageModulesApi = () => {
  return request.get<BaseResponseWithArray<defs.admin.PageModules>>({
    url: '/api/pageModules',
    method: 'get',
  })
}

export const createPageModuleApi = (data: defs.admin.CreatePageModulesRequest) => {
  return request.post<defs.admin.PageModules>({
    url: '/api/pageModules',
    method: 'post',
    data,
  })
}

export const updatePageModuleApi = (id: number, data: defs.admin.UpdatePageModulesRequest) => {
  return request.put<[number, defs.admin.PageModules]>({
    url: `/api/pageModules/${id}`,
    method: 'put',
    data,
  })
}

export const showPageModuleApi = (id: number) => {
  return request.get<defs.admin.PageModules>({
    url: `/api/pageModules/show/${id}`,
    method: 'get',
  })
}

export const deletePageModuleApi = (id: number) => {
  return request.delete<number>({
    url: `/api/pageModules/${id}`,
    method: 'delete',
  })
}
