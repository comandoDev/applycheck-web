import ManagerRepository from "@/Repositories/ManagerRepository"
import { IRecord } from "@/interfaces/Record"
import Storage from "@/utils/Storage"
import { Button, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"

const RecordComment = ({ record }: { record: IRecord }) => {
    const [comment, setComment] = useState<string>()
    const [commentLoading, setCommentLoading] = useState<boolean>(false)

    useEffect(() => {
        setComment(record.comment)
    }, [])

    const handleSaveCommentOnClick = async () => {
        try {
            setCommentLoading(true)

            const response = await ManagerRepository.commentRecord(record.id!, {
                comment
            })

            message.success(response.data.message)

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        } catch (error) {
            message.error((error as any).message)
        } finally {
            setCommentLoading(false)
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            <h2 className="text-[25px] text-zinc-600 mb-3">Observações:</h2>

            <TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                disabled={record?.managerId !== Storage.getUser()?.id!}
                className="w-full"
            />
            <Button
                loading={commentLoading}
                style={{ position: 'absolute', bottom: 5, right: 5 }}
                onClick={handleSaveCommentOnClick}
                disabled={record?.managerId !== Storage.getUser()?.id!}
            >
                Salvar
            </Button>
        </div>
    )
}

export default RecordComment