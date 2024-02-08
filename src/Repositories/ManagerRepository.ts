import { Repository } from '@/core/Repository'
import { IForm } from '@/interfaces/Form'
import { IRecord } from '@/interfaces/Record'
import { IPaginateList, IResponse } from '@/interfaces/Response'
import { IUser } from '@/interfaces/User'

class ManagerRepository extends Repository<IUser> {
  async listForms (): Promise<IResponse<IPaginateList<IForm>>> {
    return this.execute(() =>
      this.api.get(`${this.path}/forms`)
    )
  }

  async listRecords (): Promise<IResponse<IPaginateList<IRecord>>> {
      return this.execute(() =>
        this.api.get(`${this.path}/records`)
      )
   }

    async getOneRecord (recordId: string): Promise<IResponse<{ record: IRecord }>> {
        return this.execute(() =>
          this.api.get(`${this.path}/records/get/${recordId}`)
        )
      }
    
    async analyzeRecord (recordId: string): Promise<IResponse<IResponse>> {
      return this.execute(() =>
        this.api.get(`${this.path}/records/${recordId}/analysing`)
      )
    }
    
    async dash (): Promise<IResponse<{
        dash: {
            totalCount: number
            registerWithoutNonComplianceCount: number
            registerWithNonComplianceCount: number
            nonComplianceCount: number
            docs: any
        }
    }>> {
        return this.execute(() =>
          this.api.get(`${this.path}/records/dash`)
        )
    }
}

export default new ManagerRepository('auth')
