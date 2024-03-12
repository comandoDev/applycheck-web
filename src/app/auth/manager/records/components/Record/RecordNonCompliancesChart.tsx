import { IRecord } from "@/interfaces/Record"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import('react-apexcharts'))

const RecordNonCompliancesChart = ({ record }: { record: IRecord }) => {  
    const options ={
        chart: {
          height: 100,
          type: 'line',
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
            text: 'Quantidade de não conformidades por passo',
            align: 'left'
        },
        xaxis: {
            categories: record?.steps?.map(step => `ETAPA-${step.order}`),
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
      }

    const series = [{
        name: 'Campos',
        data: record?.nonComplianceSteps!.map(step => step.nonComplianceCount)
    }]
    
    return (
        <>
          { typeof window !== 'undefined' && (
            <Chart type="area" options={options as any}  series={series} height={300} width={'100%'} />
          ) }
        </>
    )
}

export default RecordNonCompliancesChart
