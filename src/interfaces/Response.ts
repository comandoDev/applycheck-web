import { AxiosResponse } from 'axios'

interface IPaginate<T> {
    next: boolean
    previous: boolean
    totalDocs: number
    docs: Array<T>
}

interface IPaginateList<T> {
  [key: string]: IPaginate<T>
}

interface IDocumentIdResponse {
  [key: string]: string
}

interface IInputError {
  field: string
  message: string
}

interface IResponseData<T = any> {
  data?: T
  message: string
  code: number
  status: string
}

interface IResponse<T = any> extends AxiosResponse<IResponseData<T>> {}

export type {
  IDocumentIdResponse,
  IInputError,
  IPaginate,
  IPaginateList,
  IResponse,
  IResponseData
}
