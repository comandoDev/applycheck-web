import { IResponseData } from "@/interfaces/Response";
import { IUser } from "@/interfaces/User";

export interface IUserSigninProps {
  email: string
  password: string
}

export interface IAuthContext {
  user?: IUser
  userToken?: string
  error?: IResponseData
  logout: () => void
  setError: (error?: any) => void
  handleUserSignin: (props: IUserSigninProps) => Promise<void>
  loading?: boolean
  setLoading: (loading: boolean) => void
}