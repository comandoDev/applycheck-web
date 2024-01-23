import { Repository } from '@/core/Repository'
import { IRecord } from '@/interfaces/Record'
import { IPaginateList, IResponse } from '@/interfaces/Response'
import { IUser } from '@/interfaces/User'

class ManagerRepository extends Repository<IUser> {
    async listRecords (): Promise<IResponse<IPaginateList<IRecord>>> {
        return this.execute(() =>
          this.api.get(`${this.path}/records?limit=20`)
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
