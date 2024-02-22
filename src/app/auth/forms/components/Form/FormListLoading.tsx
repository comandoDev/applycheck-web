import { ArrowCircleRight } from "@phosphor-icons/react"

const FormListLoading = () => {
    return (
        <>
            {[1, 2, 3].map(i => {
                return (
                    <div key={i} className='animate-pulse w-full p-4 rounded-lg border border-gray-150 bg-white text-selected mb-5 shadow-md'>
                        <div className="w-full flex justify-between mb-3 items-start">
                            <div className="flex flex-col w-full">
                                <div className="bg-zinc-400 w-[95%] h-3"></div>
                                <div className="bg-zinc-400 w-[30%] h-3 mt-1"></div>
                                <div className="bg-zinc-300 w-[40%] h-3 mt-3"></div>
                            </div>
                            <div>
                                <ArrowCircleRight size={32} weight="fill" fill='#979797' />
                            </div>
                        </div>
                        <div className="bg-zinc-300 w-full h-3 mt-1"></div>
                        <div className="bg-zinc-300 w-full h-3 mt-1"></div>
                        <div className="bg-zinc-300 w-full h-3 mt-1"></div>
                    </div>
                )
            })}
        </>
    )
}

export default FormListLoading