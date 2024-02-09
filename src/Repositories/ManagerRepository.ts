import { Repository } from '@/core/Repository'
import { IForm } from '@/interfaces/Form'
import { IRecord, IRecordParams } from '@/interfaces/Record'
import { IPaginateList, IResponse } from '@/interfaces/Response'
import { IUser } from '@/interfaces/User'

class ManagerRepository extends Repository<IUser> {
  async listForms (): Promise<IResponse<IPaginateList<IForm>>> {
    return this.execute(() =>
      this.api.get(`${this.path}/forms`)
    )
  }

  async listRecords (params?: IRecordParams): Promise<IResponse<{ records: Array<IRecord> }>> {
      return this.execute(() =>
        this.api.get(`${this.path}/records`, {
          params
        })
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
          registerWithNonComplianceCountByMonth: Array<number>
          registerWithoutNonComplianceCountByMonth: Array<number>
          nonComplianceCountByMonth: Array<number>
          registerCountByMonth: Array<number>
        }
    }>> {
        return this.execute(() =>
          this.api.get(`${this.path}/records/dash`)
        )
    }
}

export default new ManagerRepository('auth')
