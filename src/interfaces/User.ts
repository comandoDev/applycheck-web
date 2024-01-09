enum UserRole {
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

    name: string
    email: string
    role: UserRole
}

export type {
  IUser,
  UserRole
}
