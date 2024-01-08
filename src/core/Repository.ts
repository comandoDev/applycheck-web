import axios, { AxiosInstance, AxiosError } from 'axios'
import { apiServer } from "@/services/api"
import { IDocumentIdResponse, IPaginateList, IResponse } from '@/interfaces/Response'


export class Repository<T> {
  constructor (
    protected path: string = '',
    protected api: AxiosInstance = apiServer
  ) { } 

  async list (): Promise<IResponse<IPaginateList<T>>> {
    return this.execute<IPaginateList<T>>(() =>
      this.api.get(this.path)
    )
  }

  async getOne (id: string): Promise<IResponse<T>> {
    return this.execute(() =>
      this.api.get(`${this.path}/:${id}`)
    )
  } 

  async create (data: T): Promise<IResponse<T>> {
    return this.execute(() =>
      this.api.post(`${this.path}`, data)
    )
  }

  async update (id: string, data: Partial<T>): Promise<IResponse<IDocumentIdResponse>> {
    return this.execute<IDocumentIdResponse>(() =>
      this.api.patch(`${this.path}/:${id}`, data)
    )
  }

  async delete (id: string): Promise<IResponse<IDocumentIdResponse>> {
    return this.execute<IDocumentIdResponse>(() =>
      this.api.delete(`${this.path}/:${id}`)
    )
  }

  async execute<K = T> (request: () => Promise<IResponse<K>>): Promise<IResponse<K>> {
    try {
      return await request()
    } catch (err) {
      if (axios.isCancel(err)) throw err
      throw (<AxiosError>err).response?.data
    }
  }
}