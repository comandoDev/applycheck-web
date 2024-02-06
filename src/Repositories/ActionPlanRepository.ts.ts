import { Repository } from '@/core/Repository'
import { IActionPlan } from '@/interfaces/ActionPlan'
import { IPaginateList, IResponse } from '@/interfaces/Response'

export interface IActionPlanListFilters {
  employeeId?: string
  solved?: boolean
  tenantId: string
  limit: number
  page: number
} 

class ActionPlanRepository extends Repository<IActionPlan> {
  async solve (actionPlanId: string): Promise<IResponse> {
    return this.execute(() =>
      this.api.get(`${this.path}/${actionPlanId}/solve`)
    )
  }
}

export default new ActionPlanRepository('auth/action-plans')
