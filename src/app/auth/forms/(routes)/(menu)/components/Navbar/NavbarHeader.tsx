import Storage from "@/utils/Storage"

const NavbarHeader = () => {
    return (
        <div className="p-7 w-full flex items-center border-b bottom-4 border-zinc-200 bg-white">
            <div className="bg-principal text-white font-bold rounded-full w-[40px] h-[40px] flex justify-center items-center text-2xl">{Storage.getUser()?.name[0]}</div>
            <span className="ml-5 text-zinc-600 font-medium">{Storage.getUser()?.name}</span>
        </div>
    )
}

export default NavbarHeader