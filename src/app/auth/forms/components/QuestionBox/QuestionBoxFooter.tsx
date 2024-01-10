import { CameraPlus, ChatText, WarningDiamond } from "@phosphor-icons/react"

const QuestionBoxFooter = () => {
    return (
        <div className="w-full flex justify-between text-xs text-center text-gray-500 font-bold"> 
                <div className="flex justify-center items-center">
                    <WarningDiamond size={20} weight="fill" className="mr-1" />
                    <span>Plano Ação</span>    
                </div>    
                <div className="flex justify-center items-center">
                    <ChatText size={20} weight="fill" className="mr-1" />
                    <span>Observação</span>    
                </div>        
                <div className="flex justify-center items-center">
                    <CameraPlus size={20} weight="fill" className="mr-1" />
                    <span>Mídia</span>    
                </div>    
        </div>  
    )
}

export default QuestionBoxFooter