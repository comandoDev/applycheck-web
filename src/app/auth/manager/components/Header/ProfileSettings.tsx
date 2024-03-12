import { useAuth } from "@/hooks/useAuth"
import Storage from "@/utils/Storage"
import { ArrowSquareOut, Gear, SignOut } from "@phosphor-icons/react"
import { Dropdown, Space } from "antd"

const ProfileSettings = () => {
    const authContext = useAuth()

    const items = [
        {
          key: '1',
          label: (
            <div className="text-zinc-500">
              { Storage.getUser()?.email }
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div className="text-zinc-500">
              Configuração da conta
            </div>
          ),
          icon: <Gear size={20} />
        },
        {
          key: '3',
          label: (
            <div className="text-zinc-500">
              AuditList Homepage
            </div>
          ),
          icon: <ArrowSquareOut size={20} />
        },
        {
          key: '4',
          label: (
            <div  onClick={() => authContext?.logout()} className="text-zinc-500">
              Sair
            </div>
          ),
          icon: <SignOut size={20} />
        },
      ]

    return (
        <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <div className="cursor-pointer ml-7 w-[50px] h-[50px] rounded-full flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xl">{Storage.getUser()?.name[0].toUpperCase()}</div>
                </Space>
            </a>
        </Dropdown>
    )
}

export default ProfileSettings