declare interface BaseParams {
  page: number
  limit: number
}

declare interface BaseResponse {
  code: number
  message: string
}

declare interface BaseResponseWithData<T> extends BaseResponse {
  result: T
}

declare type BaseResponseWithArray<T> = BaseResponseWithData<{
  rows: T[]
  count: number
}>
