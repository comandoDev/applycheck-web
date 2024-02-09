import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import('react-apexcharts'))

interface IChartBoxProps {
    title: string
    data: Array<number>
    lastOne?: boolean
}

const ChartBox = ({
    title,
    data,
    lastOne
}: IChartBoxProps) => {
        const [months, setMonths] = useState<Array<string>>(['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun'])

        useEffect(() => {
            const monthNumber = new Date().getMonth() 

            if (monthNumber > 6) setMonths(['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'])
        }, [])

        const boxStyle = 'flex-1 p-3 flex bg-white border border-zinc-300 shadow-xl'
          
        const series = [{
            name: title,
            data
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
                text: title,
                align: 'left'
            },
            xaxis: {
                categories: months,
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
              },
            },
          }

    return (
        <div className={`${boxStyle} ${lastOne ? 'mr-0' : 'mr-14'}`}>
            <div className="flex-1 flex justify-center">
            {typeof window !== 'undefined' && (
              <Chart type="area" options={options as any} series={series} height={200} width={250} />
            )}
            </div>
        </div>
    )
}

export default ChartBox