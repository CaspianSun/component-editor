import service from '@/utils/request'
import { Urls } from './urls'

export interface GetImgListParams extends BaseParams {
  groupId: number
  name: string
}

export interface ImgListItem {
  id: number
  name: string
  path: string
  groupId: number
}

export const getImgListApi = (params: GetImgListParams) => {
  return service.request<BaseResponseWithArray<ImgListItem>>({
    url: Urls.materialLibrary,
    method: 'get',
    params
  })
}

export const deleteImgApi = (id: number) => {
  return service.request<BaseResponse>({
    url: Urls.materialLibrary,
    method: 'delete',
    data: {
      id
    }
  })
}

export interface GroupListItem {
  id: number
  name: string
}

export const getGroupListApi = () => {
  return service.request<BaseResponseWithArray<GroupListItem>>({
    url: Urls.materialLibraryGroup,
    method: 'get'
  })
}

export const addImgGroupApi = (data: Omit<GroupListItem, 'id'>) => {
  return service.request<BaseResponse>({
    url: Urls.materialLibraryGroup,
    method: 'post',
    data
  })
}
export const deleteImgGroupListApi = (id: number) => {
  return service.request<BaseResponse>({
    url: Urls.materialLibraryGroup,
    method: 'delete',
    data: {
      id
    }
  })
}
