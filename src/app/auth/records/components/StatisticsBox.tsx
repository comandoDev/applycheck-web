import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"

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
        const [months, setMonths] = useState<Array<string>>(['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun'])

        useEffect(() => {
            const monthNumber = new Date().getMonth() 

            if (monthNumber > 6) setMonths(['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'])
        }, [])

        const boxStyle = 'flex-1 p-3 flex bg-white border border-zinc-300 shadow-xl'
          
        const series = [{
            name: title,
            data: [Number(data), 98, 17, 43, 56, 8]
        }]

        const options = {
            chart: {
              height: 100,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
                text: `${title} (${data})`,
                align: 'left'
            },
            xaxis: {
                categories: months,
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
          }

    return (
        <div className={`${boxStyle} ${lastOne ? 'mr-0' : 'mr-14'}`}>
            <div className="flex-1 flex justify-center">
                <ReactApexChart type="area" options={options} series={series} height={200} width={250} />
            </div>
        </div>
    )
}

export default StatisticsBox