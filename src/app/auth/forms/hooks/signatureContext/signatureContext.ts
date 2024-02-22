export interface ISignatureContext {
    signature?: string
    setSignature: (signature?: string) => void
    fieldKey?: string
    setFieldKey: (fieldKey: string) => void
    currentCanvas?: HTMLCanvasElement
    setCurrentCanvas: (currentCanvas: HTMLCanvasElement) => void
    clearCanvas: boolean
    setClearCanvas: (clearCanvas: boolean) => void
}