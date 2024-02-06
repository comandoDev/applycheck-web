interface IActionPlan {
    id?: string
    tenantId: string
    recordId: string
    employeeId: string
    createdAt?: Date

    plan?: string
    reason?: string
    place?: string
    date?: Date
    workResponsible?: string
    price?: string
    generalResponsible?: string
    notifyManagers?: boolean
    solved?: boolean
}

export type {
    IActionPlan
}