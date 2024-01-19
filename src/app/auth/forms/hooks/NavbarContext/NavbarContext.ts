export enum SelectedOption {
    forms = 'forms',
    historic = 'historic'
}

export interface INavbarContext {
    show?: boolean
    setShow: (show: boolean) => void
    selected?: SelectedOption 
    setSelected: (selected: SelectedOption) => void 
}