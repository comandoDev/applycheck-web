import { getErrorMessageByFieldName } from '@/utils/getErrorByFieldName'

export interface IInputProps {
  placeHolder?: string
  name?: string
  showError?: boolean
  setShowError?: (show: boolean) => void
  onChange?: (value: any) => void
  type?: string
  isSelect?: boolean
  isSubmit?: boolean
  options?: Array<{
    name: string
    value: string
  }>
  value?: any
}

const Input = ({
  placeHolder,
  name,
  showError,
  setShowError,
  onChange,
  type = 'text',
  isSelect,
  options,
  value,
  isSubmit
}: IInputProps) => {
  return (
    <div>
      { !isSubmit && <input type={type} name={name} className={`${getErrorMessageByFieldName(name!) && 'border border-red-400'} w-full bg-slate-50 rounded-lg p-5 mb-5`} placeholder={placeHolder} onChange={e => onChange!(e.target.value) }/> }

      { isSubmit && <input type="submit" value={value} className={`w-full bg-principal text-white font-bold p-4 rounded-xl`} /> }
      
      { getErrorMessageByFieldName(name!) && <h1 className='text-red-500 -mt-4 mb-4 text-xs'>{getErrorMessageByFieldName(name!)}</h1>}
    </div>
  )
}

export default Input