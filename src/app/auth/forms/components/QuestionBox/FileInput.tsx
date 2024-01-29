import { apiServer } from "@/services/api"
import { message } from "antd"
import { ChangeEvent } from "react"
import { IField } from "@/interfaces/Form"
import { useFile } from "../../hooks/FileContext/useFile"

const FileInput = ({ inputId, field }: { inputId: string, field: IField }) => {
    const fileContext = useFile()

    const handleFileOnChange =  async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            fileContext?.setLoading(true)

            const file = event.target.files![0]
 
            if (file) {
                const formData = new FormData()
                
                formData.append('image', file)

                const response = await apiServer.post('/auth/records/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                const fileUrl = response.data.data.file

                fileContext?.setFile(fileUrl)
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
        />
    )
}

export default FileInput