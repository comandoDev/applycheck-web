interface IStatisticsBoxProps {
    title: string
    data: number
    lastOne?: boolean
}

const StatisticsBox = ({
    title,
    data,
    lastOne
}: IStatisticsBoxProps) => {
    const boxStyle = 'flex-1 p-5 flex bg-white border border-zinc-300 mr-10 shadow-xl'

    return (
        <div className={`${boxStyle} ${lastOne && 'mr-0'}`}>
            <div className="flex-1 flex flex-col">
                <span className="text-xs">{ title }</span>
                <span className="font-bold mt-1">{ data }</span>
           </div>
           <div className="flex-1"></div>
        </div>
    )
}

export default StatisticsBox