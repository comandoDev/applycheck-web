import { Repository } from "@/core/Repository";
import { IResponse } from "@/interfaces/Response";
import { IUser } from "@/interfaces/User";

interface IAuthenticationProps {
  user: IUser,
  token: string
}

interface ISignInProps {
  email: string 
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
}

export default new UserRepository('unauth')
