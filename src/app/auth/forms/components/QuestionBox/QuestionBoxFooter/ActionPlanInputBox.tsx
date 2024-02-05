interface IActionPlanInputBoxProps {
    name: string
    label: string
    onChange: (value: any) => void
    value?: any
    type?: string
}

const ActionPlanInputBox = ({
    name,
    label,
    onChange,
    value,
    type = 'text'
}: IActionPlanInputBoxProps) => {
    return (
        <div className="mb-3 flex flex-col">
            <label htmlFor={name} className="text-principal mb-2">{label}</label>
            <input type={type} name={name} value={value} className="pl-1 p-2 outline-0 border border-zinc-250 rounded-lg" onChange={e => onChange(e.target.value)}/>
        </div>
    )
}

export default ActionPlanInputBox