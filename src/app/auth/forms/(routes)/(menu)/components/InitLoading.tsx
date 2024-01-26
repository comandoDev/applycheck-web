const InitLoading = ({ isStarted }: { isStarted: boolean }) => {
    return (
        <div className="animate-pulse">
            <div className="border-b border-gray-400 pb-3">
                <div className="bg-zinc-500 w-[85%] h-3 mb-3"></div>
                <div className="bg-zinc-400 w-[65%] h-2 mb-2"></div>
                <div className="bg-zinc-400 w-[55%] h-2 mb-2"></div>
                <div className="bg-zinc-400 w-[45%] h-2"></div>
            </div>
            <div className="flex flex-col mb-5 mt-5">
                <div className="flex items-center mb-5">
                    <div className="h-7 w-7 bg-zinc-200 rounded-full mr-3"></div>
                    <div className="w-[60%] h-3 bg-zinc-300"></div>
                </div>
                <div className="flex items-center mb-5">
                    <div className="h-7 w-7 bg-zinc-200 rounded-full mr-3"></div>
                    <div className="w-[60%] h-3 bg-zinc-300"></div>
                </div>
                <div className="flex items-center mb-5">
                    <div className="h-7 w-7 bg-zinc-200 rounded-full mr-3"></div>
                    <div className="w-[60%] h-3 bg-zinc-300"></div>
                </div>
                <div className="flex items-center mb-5">
                    <div className="h-7 w-7 bg-zinc-200 rounded-full mr-3"></div>
                    <div className="w-[60%] h-3 bg-zinc-300"></div>
                </div>
                <div className="flex items-center mb-5">
                    <div className="h-7 w-7 bg-zinc-200 rounded-full mr-3"></div>
                    <div className="w-[60%] h-3 bg-zinc-300"></div>
                </div>
                <div className="flex items-center mb-5">
                    <div className="h-7 w-7 bg-zinc-200 rounded-full mr-3"></div>
                    <div className="w-[60%] h-3 bg-zinc-300"></div>
                </div>
                <div className="flex items-center mb-5">
                    <div className="h-7 w-7 bg-zinc-200 rounded-full mr-3"></div>
                    <div className="w-[60%] h-3 bg-zinc-300"></div>
                </div>
                <div className="flex items-center mb-5">
                    <div className="h-7 w-7 bg-zinc-200 rounded-full mr-3"></div>
                    <div className="w-[60%] h-3 bg-zinc-300"></div>
                </div>
            </div>
            <div className="fixed left-0 bottom-5 w-full flex justify-center pl-5 pr-5">
                <div className="p-3 bg-principal text-white font-bold text-center rounded-lg w-full">
                    { isStarted ? 'CONTINUAR' : 'INICIAR' }
                </div>
            </div>
        </div>
    )
}

export default InitLoading