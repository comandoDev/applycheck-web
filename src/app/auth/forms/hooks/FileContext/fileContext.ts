export interface IFileContext {
    file?: string | null
    setFile: (file: string | null) => void
    fieldKey?: string
    setFieldKey: (file: string) => void
}