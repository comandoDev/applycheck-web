import { UserRole } from "@/interfaces/User"

export interface IUserCreationContext {
    updateUsersTable: boolean
    setUpdateUsersTable: (updateUsersTable: boolean) => void
    isCreateModalOpen: boolean
    setIsCreateModalOpen: (isCreateModalOpen: boolean) => void
    isEditModalOpen: boolean
    setIsEditModalOpen: (isEditModalOpen: boolean) => void
    id?: string
    setId: (id: string) => void
    name?: string
    setName: (name: string) => void
    accountName?: string
    setAccountName: (accountName: string) => void
    active?: boolean
    setActive: (active: boolean) => void
    formsIds?: Array<string>
    setFormsIds: (formsIds: Array<string>) => void
    search?: string
    setSearch: (search: string) => void
    email?: string
    setEmail: (email: string) => void
    role?: UserRole
    setRole: (role: UserRole) => void
    clearProps: () => void
}
