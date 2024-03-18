export interface IRecordFiltersContext {
    formId: string | null
    setFormId: (formId: string | null) => void
    employeeId: string | null
    setEmployeeId: (userId: string | null) => void
    date: string | null
    setDate: (date: string | null) => void
    nonCompliance: string | null
    setNonCompliance: (nonCompliance: string | null) => void
    reloadData: boolean
    setReloadData: (reloadData: boolean) => void
}