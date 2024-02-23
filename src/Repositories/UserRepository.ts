import { Repository } from '@/core/Repository'
import { IResponse } from '@/interfaces/Response'
import { ISetUserPasswordProps, IUser } from '@/interfaces/User'

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
    accountName,
    password,
    passwordConfirmation
  }: ISetUserPasswordProps): Promise<IResponse> {
    return this.execute(() =>
      this.api.post(`${this.path}/users/${accountName}/set-password`, {
        password,
        passwordConfirmation
      })
    )
  }

  async hasPassword (accountName: string): Promise<IResponse<{ hasPassword: boolean }>> {
    return this.execute(() =>
      this.api.get(`${this.path}/users/${accountName}/has-password`)
    )
  }
}

export default new UserRepository('unauth')
