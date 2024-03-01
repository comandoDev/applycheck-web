import { IBranch } from "@/interfaces/Branch"
import Storage from "@/utils/Storage"
import { Select } from "antd"
import { useEffect, useState } from "react"
import { useRecordFiltersContext } from "../../records/hooks/RecordFiltersContext/useRecordFilter"
import { useRouter } from "next/navigation"
import { useManagerNavbar } from "../../hooks/NavbarContext/useManagerNavbar"
import { ManagerNavbarSelectedOption } from "../../hooks/NavbarContext/ManagerNavbarContext"

const ChangeBranchSelect = () => {
    const recordFiltersContext = useRecordFiltersContext()
    const navbarContext = useManagerNavbar()

    const router = useRouter()

    const [branches, setBranches] = useState<Array<IBranch>>()

    useEffect(() => {
        setBranches(Storage.getUser()!.branches)
    }, [])

    const handleOnChange = (value: string) => {
        Storage.setBranchId(value)
    
        recordFiltersContext?.setReloadTable(!recordFiltersContext.reloadTable)
        navbarContext?.setSelected(ManagerNavbarSelectedOption.records)

        router.push('/auth/records')
    }

    return (
        <Select
            defaultValue={Storage.getBranchId()!}
            className="min-w-32"
            onChange={handleOnChange}
            options={branches?.map(branch => {
                return {
                    label: branch.name,
                    value: branch.id
                }
            })}
        />
    )
}

export default ChangeBranchSelect