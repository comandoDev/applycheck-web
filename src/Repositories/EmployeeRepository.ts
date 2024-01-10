import { Repository } from '@/core/Repository'
import { IForm } from '@/interfaces/Form'
import { IRecord, IRecordStep } from '@/interfaces/Record'
import { IPaginateList, IResponse } from '@/interfaces/Response'
import { IUser } from '@/interfaces/User'

class EmployeeRepository extends Repository<IUser> {
  async listForms (): Promise<IResponse<IPaginateList<IForm>>> {
    return this.execute(() =>
      this.api.get(`${this.path}/forms`)
    )
  }

  async getOneForm (formId: string): Promise<IResponse<{ form: IForm }>> {
    return this.execute(() =>
      this.api.get(`${this.path}/forms/${formId}`)
    )
  }

  async createRecord (formId: string): Promise<IResponse<{ record: IRecord }>> {
    return this.execute(() =>
      this.api.post(`${this.path}/records`, {
        formId
      })
    )
  }

  async hasRecordInProgress (): Promise<IResponse<{ record: IRecord }>> {
    return this.execute(() =>
      this.api.get(`${this.path}/records/in-progress`)
    )
  }

  async updateRecordStep (recordId: string, step: IRecordStep): Promise<IResponse> {
    return this.execute(() =>
      this.api.patch(`${this.path}/records/${recordId}`, {
        step
      })
    )
  }

  async finishRecord (recordId: string): Promise<IResponse> {
    return this.execute(() =>
      this.api.get(`${this.path}/records/${recordId}/finish`)
    )
  }

//   async uploadFile (): Promise<IResponse> {
//     return this.execute(() =>
//       this.api.post(`${this.path}/records/upload`)
//     )
//   }
}

export default new EmployeeRepository('auth')
