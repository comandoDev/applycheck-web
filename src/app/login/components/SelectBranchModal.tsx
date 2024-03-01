import { useAuth } from "@/hooks/useAuth"
import { UserRole } from "@/interfaces/User"
import Storage from "@/utils/Storage"
import { Modal, Select } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SelectBranchModal = () => {
    const authContext = useAuth()
    
    const router = useRouter()

    const [branchId, setBranchId] = useState<string>()

    const handleOkClick = async () => {
        if (!branchId) return

        Storage.setBranchId(branchId)

        const userRole = Storage.getUserRole()!
        
        if (userRole === UserRole.employee) {
            router.push('/auth/forms') 
        } else {
            router.push('/auth/records') 
        } 
        
        authContext?.setShowBranchBox(false)
    }

    const handleCancelClick = () => {
        Storage.clear()
        authContext?.setShowBranchBox(false)
    }

    return (
        <Modal 
            open={authContext?.showBranchBox}
            okType="dashed"
            onOk={handleOkClick}
            onCancel={handleCancelClick}  
        >
            <>
                <h1 className="text-center text-xl text-zinc-600 font-bold mt-5 mb-5">Selecione a filial que deseja utilizar</h1>
                <Select
                    defaultValue="Selecione"
                    className="w-full"
                    onChange={value => setBranchId(value)}
                    options={ authContext?.branches.map(branch => {
                        return {
                            value: branch.id,
                            label: branch.name
                        }
                    }) }
                />
            </>
        </Modal>
    )
}

export default SelectBranchModal