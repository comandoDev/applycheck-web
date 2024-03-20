import { IBranch } from "./Branch"

export enum UserRole {
    employee = 'employee',
    manager = 'manager',
    admin = 'admin'
}

interface ISetUserPasswordProps {
  accountName?: string
  email?: string
  password: string
  passwordConfirmation: string
}

interface IUserFormsIds {
  branchId: string
  ids: Array<string>
}

interface IUser {
    id?: string
    managerId?: string
    active?: boolean
    password?: string
    tenantId: string
    email?: string
    accountName?: string

    name: string
    role: UserRole
    formsIds: Array<IUserFormsIds>
    branchId: string
    branchesIds: Array<string>
    branches: Array<IBranch>
}

export type {
  IUser,
  IUserFormsIds,
  ISetUserPasswordProps
}
