export interface ISignatureContext {
    signature?: string
    setSignature: (signature?: string) => void
    fieldKey?: string
    setFieldKey: (fieldKey: string) => void
}