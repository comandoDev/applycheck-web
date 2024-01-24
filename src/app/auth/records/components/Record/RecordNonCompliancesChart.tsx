import { IRecord } from "@/interfaces/Record"
import ReactApexChart from "react-apexcharts"

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
            categories: record?.steps?.map(step => `Passo - ${step.order}`),
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
        <ReactApexChart type="area" options={options as ApexCharts.ApexOptions}  series={series} height={300} width={'100%'} />
    )
}

export default RecordNonCompliancesChart
