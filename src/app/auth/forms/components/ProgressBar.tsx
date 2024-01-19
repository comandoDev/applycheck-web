const ProgressBar = ({ percentage }: { percentage: number }) => {
    return (
        <div className="w-full h-3 bg-gray-300 rounded-lg">
            <div className='h-3 bg-progress rounded-lg' style={{ width: `${percentage}%`}}></div>                
        </div>
    )
}

export default ProgressBar