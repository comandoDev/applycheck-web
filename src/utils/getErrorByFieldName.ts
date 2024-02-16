import { useAuth } from "@/hooks/useAuth"
import { IInputError } from "@/interfaces/Response"

export const getErrorMessageByFieldName = (field: string): string | undefined => {
  const authContext = useAuth()

  let message

  if (authContext?.error?.data?.length) {
    authContext?.error?.data.map((inputError: IInputError) => {
      if (inputError.field === field) message = inputError.message
    })
  }

  return message
}