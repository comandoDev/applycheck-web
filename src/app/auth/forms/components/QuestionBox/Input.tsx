import { InputType } from "@/interfaces/Form"

interface IFormInput {
    type: InputType
    placeholder: string
    onChange?: (value: string) => void
    onChangeArray?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

const FormInput = ({ 
    type,
    placeholder,
    onChange,
    onChangeArray,
    value
}: IFormInput) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChangeArray) {
            onChangeArray(e)
        }
        if (onChange) {
            onChange(e.target.value)
        }
    }

    return (
        <input 
            className='w-full rounded-lg p-3 pl-4 mt-3 bg-white border border-gray-300' 
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            value={value || ''}
        />
    )
}

export default FormInput
