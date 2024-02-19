export interface IEmployeeCreationContext {
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
    password?: string
    setPassword: (accountName: string) => void
    active?: boolean
    setActive: (active: boolean) => void
    formsIds?: Array<string>
    setFormsIds: (formsIds: Array<string>) => void
}
