import { apiServer } from "@/services/api"
import { message } from "antd"
import { ChangeEvent } from "react"
import { IField } from "@/interfaces/Form"
import { useFile } from "../../../hooks/FileContext/useFile"
import { useForm } from "../../../hooks/FormContext/useForm"

const FileInput = ({ inputId, field }: { inputId: string, field: IField }) => {
    const fileContext = useFile()
    const formContext = useForm()

    const handleFileOnChange =  async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            fileContext?.setLoading(true)

            const filesSent = event.target.files

            if (filesSent?.length) {
                const newFiles = await Promise.all(
                    Array.from(filesSent).map(async (file) => {
                        const formData = new FormData()
                    
                        formData.append('image', file)
    
                        const response = await apiServer.post('/auth/records/upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        
    
                        return response.data.data.file
                    })
                )

                let files: string[] = []

                formContext?.currentStep?.fields.forEach(f => {
                    if (f.key === field.key) {
                        if (f.files) files.push(...f.files!)
                    }
                })

                fileContext?.setFiles([...files, ...newFiles])
                fileContext?.setFieldKey(field.key)
            }
 
        } catch (error) {
            message.error((error as any).message)
        } finally {
            fileContext?.setLoading(false)
        }
    }
    
    return (
        <input 
            id={inputId}
            type="file"
            className="hidden"
            onChange={handleFileOnChange}
            accept="image/*"
            multiple
        />
    )
}

export default FileInput