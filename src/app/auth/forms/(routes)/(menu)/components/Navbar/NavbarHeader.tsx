import Storage from "@/utils/Storage"

const NavbarHeader = () => {
    return (
        <div className="p-7 bg-principal w-full flex items-center">
            <div className="bg-white text-principal font-bold rounded-full w-[40px] h-[40px] flex justify-center items-center text-2xl">{Storage.getUser()?.name[0]}</div>
            <span className="ml-5 text-white font-medium">{Storage.getUser()?.name}</span>
        </div>
    )
}

export default NavbarHeader