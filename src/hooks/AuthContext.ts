import { IBranch } from "@/interfaces/Branch";
import { IResponseData } from "@/interfaces/Response";
import { ISetUserPasswordProps, IUser, UserRole } from "@/interfaces/User";

export interface IManagerSigninProps {
  email: string
  password: string
}

export interface IEmployeeSigninProps {
  accountName: string
  password: string
}

export interface IAuthContext {
  user?: IUser
  userToken?: string
  error?: IResponseData
  logout: () => void
  setError: (error?: any) => void
  handleManagerSignin: (props: IManagerSigninProps) => Promise<void>
  handleEmployeeSignin: (props: IEmployeeSigninProps) => Promise<void>
  loading?: boolean
  setLoading: (loading: boolean) => void
  setPassword: (props: ISetUserPasswordProps) => Promise<void>
  showBranchBox: boolean
  setShowBranchBox: (showBranchBox: boolean) => void
  branches: Array<IBranch>
  setBranches: (branches: Array<IBranch>) => void
  userRole?: UserRole
  setUserRole: (userRole: UserRole) => void
}