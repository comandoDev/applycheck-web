export enum UserRole {
    employee = 'employee',
    manager = 'manager',
    admin = 'admin'
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
    formsIds: Array<string>
}

export type {
  IUser
}
