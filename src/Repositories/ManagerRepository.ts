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

  async listEmployees ({ search }: { search?: string }): Promise<IResponse<IPaginateList<IUser>>> {
    return this.execute(() =>
      this.api.get(`${this.path}/users`, {
        params: { 
          search
        }
      })
    )
 }

  async createEmployee (data: Partial<IUser>): Promise<IResponse<{ createdUser: IUser }>> {
    return this.execute(() =>
      this.api.post(`${this.path}/users/`, data)
    )
  }

  async editEmployee (employeeId: string, data: Partial<IUser>): Promise<IResponse> {
    return this.execute(() =>
      this.api.patch(`${this.path}/users/${employeeId}`, data)
    )
  }

  async deleteEmployee (employeeId: string): Promise<IResponse> {
    return this.execute(() =>
      this.api.delete(`${this.path}/users/${employeeId}`)
    )
  }

  async deleteRecord (recordId: string): Promise<IResponse> {
    return this.execute(() =>
      this.api.delete(`${this.path}/records/${recordId}`)
    )
  }

  async listRecords (params?: IRecordParams): Promise<IResponse<IPaginateList<IRecord>>> {
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
    
    async analyzeRecord (recordId: string): Promise<IResponse> {
      return this.execute(() =>
        this.api.get(`${this.path}/records/${recordId}/analysing`)
      )
    }

    async concluedRecord (recordId: string): Promise<IResponse> {
      return this.execute(() =>
        this.api.get(`${this.path}/records/${recordId}/conclued`)
      )
    }

    async commentRecord (recordId: string, data: Partial<IRecord>): Promise<IResponse> {
      return this.execute(() =>
        this.api.patch(`${this.path}/records/${recordId}/comment`, data)
      )
    }

    async generateRecordPDF (recordId: string): Promise<IResponse<{ pdf: string }>> {
      return this.execute(() =>
        this.api.get(`${this.path}/records/${recordId}/pdf`)
      )
    }

    async uploadSignature (signatureImage: string): Promise<IResponse<{ signature: string }>> {
      return this.execute(() =>
        this.api.post(`${this.path}/records/upload-signature`, {
          signatureImage
        })
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
