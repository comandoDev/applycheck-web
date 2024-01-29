import { useAuth } from '@/hooks/useAuth'
import { getErrorMessageByFieldName } from '@/utils/getErrorByFieldName'
import { ClipLoader } from 'react-spinners'

export interface IInputProps {
  placeHolder?: string
  name?: string
  onChange?: (value: any) => void
  type?: string
  isSubmit?: boolean
  value?: any
}

const Input = ({
  placeHolder,
  name,
  onChange,
  type = 'text',
  value,
  isSubmit,
}: IInputProps) => {
    const authContext = useAuth()

  return (
    <div>
      { !isSubmit && <input type={type} name={name} className={`${getErrorMessageByFieldName(name!) && 'border border-red-400'} w-full bg-slate-50 rounded-lg p-5 mb-5 outline-none`} placeholder={placeHolder} onChange={e => onChange!(e.target.value) }/> }

      { isSubmit && <button type="submit" className={`w-full bg-principal text-white font-bold p-4 rounded-xl cursor-pointer`}>
        { authContext?.loading ? (
          <ClipLoader
            color={'white'}
            loading={authContext.loading}
            size={17}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : value }
      </button> }
      
      { getErrorMessageByFieldName(name!) && <h1 className='text-red-500 -mt-4 mb-4 text-xs'>{getErrorMessageByFieldName(name!)}</h1>}
    </div>
  )
}

export default Input