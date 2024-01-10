import { IForm } from "@/interfaces/Form"
import FormBox from "./FormBox"

const FormList = ({ forms, inProgressId }: { forms: Array<IForm>, inProgressId?: string }) => {
  return (
    <>
      { forms.map(form => {
        return <FormBox 
          id={form.id!}
          title={form.title}
          type={form.type}
          description={form.description}
          inProgressId={inProgressId}
        />
      }) }
    </>
  )
}

export default FormList