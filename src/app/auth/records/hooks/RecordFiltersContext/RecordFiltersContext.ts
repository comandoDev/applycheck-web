export interface IRecordFiltersContext {
    formId: string | null
    setFormId: (formId: string) => void
    employeeId: string | null
    setEmployeeId: (userId: string) => void
}