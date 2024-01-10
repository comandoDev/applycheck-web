import { IForm } from "@/interfaces/Form"
import FormBox from "./FormBox"

const FormList = ({ forms }: { forms: Array<IForm> }) => {
  return (
    <>
      { forms.map(form => {
        <FormBox 
          title={form.title}
          type={form.type}
          description={form.description}
        />
      }) }
    </>
  )
}

export default FormList