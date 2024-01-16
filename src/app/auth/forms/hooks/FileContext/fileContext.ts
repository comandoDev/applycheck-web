export interface IFileContext {
    file?: string
    setFile: (file: string | null) => void
    fieldKey?: string
    setFieldKey: (file: string) => void
}