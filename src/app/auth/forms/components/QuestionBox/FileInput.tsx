import { apiServer } from "@/services/api"
import { message } from "antd"
import { ChangeEvent } from "react"

const FileInput = ({ inputId }: { inputId: string }) => {
    const handleFileOnChange =  async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files![0]
 
            if (file) {
                const formData = new FormData()
                
                formData.append('image', file)

                const response = await apiServer.post('/auth/records/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }
 
        } catch (error) {
            message.error((error as any).message)
        }
    }
    return (
        <input 
            id={inputId}
            type="file"
            className="hidden"
            onChange={handleFileOnChange}
        />
    )
}

export default FileInput