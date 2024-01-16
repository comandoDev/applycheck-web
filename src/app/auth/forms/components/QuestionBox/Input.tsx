import { InputType } from "@/interfaces/Form"

interface IFormInput {
    type: InputType
    placeholder: string
    onChange: (value: string) => void
    value: string
}

const FormInput = ({ 
    type,
    placeholder,
    onChange,
    value
}: IFormInput) => {
    return (
        <input 
            className='w-full rounded-lg p-3 pl-4 mt-3 bg-white border border-gray-300' 
            type={type}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value}
        />
    )
}

export default FormInput