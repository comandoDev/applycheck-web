export enum ManagerNavbarSelectedOption {
    records = 'records',
    forms = 'forms',
    employees = 'employees',
    config = 'config'
}

export interface IManagerNavbarContext {
    selected?: ManagerNavbarSelectedOption 
    setSelected: (selected: ManagerNavbarSelectedOption) => void 
}