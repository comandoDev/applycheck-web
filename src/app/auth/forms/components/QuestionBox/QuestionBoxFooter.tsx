import { CameraPlus, ChatText, WarningDiamond } from "@phosphor-icons/react"
import { useState } from "react"

const QuestionBoxFooter = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>()
    
    const onClick = (index: number) => {
        setSelectedIndex(index)
    }

    return (
        <>
            <div className="w-full flex justify-between text-xs text-center text-gray-500 font-bold"> 
                <div className={`flex justify-center items-center ${(selectedIndex === 0) && 'text-principal'}`} onClick={() => onClick(0)}>
                    <WarningDiamond size={20} weight="fill" className="mr-1" />
                    <span>Plano Ação</span>    
                </div>    
                <div className={`flex justify-center items-center ${(selectedIndex === 1) && 'text-principal'}`} onClick={() => onClick(1)}>
                    <ChatText size={20} weight="fill" className="mr-1" />
                    <span>Observação</span>    
                </div>        
                <div className={`flex justify-center items-center ${(selectedIndex === 2) && 'text-principal'}`} onClick={() => onClick(2)}>
                    <CameraPlus size={20} weight="fill" className="mr-1" />
                    <span>Mídia</span>    
                </div>    
            </div>  
            <input type="text" className="w-full h-64 bg-white border border-gray-300 rounded-lg mt-5" />
        </>
    )
}

export default QuestionBoxFooter