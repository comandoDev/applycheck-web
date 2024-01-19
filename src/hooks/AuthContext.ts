import { IResponseData } from "@/interfaces/Response";
import { IUser } from "@/interfaces/User";

export interface IAuthContext {
  user?: IUser
  userToken?: string
  error?: IResponseData
  logout: () => void
  setError: (error?: any) => void
  handleUserSignin: (email: string, password: string) => Promise<void>
}