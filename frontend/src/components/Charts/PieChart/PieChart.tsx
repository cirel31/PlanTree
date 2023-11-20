import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface TreePieChart {
  branchNames: string[]
  branchTotalCount: number[]
}

const PieChart: React.FC<TreePieChart> = ({
  branchNames,
  branchTotalCount,
}) => {
  // if (branchNames.length > 0) {
  //   return <p>아직 생성된 가지가 없습니다.</p>
  // }
  const data = {
    labels: branchNames,
    datasets: [
      {
        label: '# of Votes',
        data: branchTotalCount,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return <Pie data={data} />
}
export default PieChart
