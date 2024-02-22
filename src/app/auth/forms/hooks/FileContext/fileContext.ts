export interface IFileContext {
    files?: Array<string>
    setFiles: (files: Array<string>) => void
    fieldKey?: string
    setFieldKey: (file?: string) => void
    loading?: boolean
    setLoading: (loaidng: boolean) => void
}