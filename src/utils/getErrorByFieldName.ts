import { useAuth } from "@/hooks/useAuth"
import { IInputError } from "@/interfaces/Response"

export const getErrorMessageByFieldName = (field: string): string | undefined => {
  const authContext = useAuth()

  let messsage

  if (authContext?.error?.data?.length) {
    authContext?.error?.data.map((inputError: IInputError) => {
      if (inputError.field === field) messsage = inputError.message
    })
  }

  return messsage
}