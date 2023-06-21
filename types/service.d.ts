declare interface BaseParams  {
  page: number
  limit: number
}

declare interface BaseResponseWithArray<T> extends BaseResponse {
  data: {
    count: number
    rows: T[]
  }
}

declare interface BaseResponseWithData<T = unknown> extends BaseResponse {
  data: T
}

declare type BaseResponse = {
  message: string
  status: number
}

declare interface UploadResponse {
  data: {
    url: string
    message: string
    name: string
    status: number
  }
  status: number
  message: string
}