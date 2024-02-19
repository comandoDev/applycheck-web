import { Repository } from '@/core/Repository'
import { IResponse } from '@/interfaces/Response'
import { IUser } from '@/interfaces/User'

interface IAuthenticationProps {
  user: IUser,
  token: string
}

interface ISignInProps {
  email: string
  password: string
}


interface IEmployeeSignInProps {
  accountName: string
  password: string
}


export interface ISetPasswordProps {
  password: string
  passwordConfirmation: string
  userId: string
}

class UserRepository extends Repository<IAuthenticationProps> {
  async signin ({
    email,
    password
  }: ISignInProps): Promise<IResponse<IAuthenticationProps>> {
    return this.execute(() =>
      this.api.post(`${this.path}/signin`, {
        email,
        password
      })
    )
  }

  async employeeSignin ({
    accountName,
    password
  }: IEmployeeSignInProps): Promise<IResponse<IAuthenticationProps>> {
    return this.execute(() =>
      this.api.post(`${this.path}/signin/employee`, {
        accountName,
        password
      })
    )
  }

  async setPassword ({
    password,
    passwordConfirmation,
    userId
  }: ISetPasswordProps): Promise<IResponse<IAuthenticationProps>> {
    return this.execute(() =>
      this.api.post(`${this.path}/password/${userId}`, {
        password,
        passwordConfirmation
      })
    )
  }
}

export default new UserRepository('unauth')
