/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import React, { useMemo } from "react"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import { Bar } from "react-chartjs-2"

interface HomeExpertiseFrameworkChartProps {
  entries: Array<{
    label: string
    value: number
  }>
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const HomeExpertiseFrameworkChart: React.FC<
  HomeExpertiseFrameworkChartProps
> = ({ entries }) => {
  const labels = useMemo(() => entries.map(entry => entry.label), [entries])
  const data = useMemo(() => entries.map(entry => entry.value), [entries])

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: "rgba(192, 178, 131, .3)",
            borderColor: "rgba(192, 178, 131, .6)",
            borderWidth: 1,
          },
        ],
      }}
      options={{
        events: [],
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            display: false,
          },
        },
      }}
    />
  )
}

export default React.memo(HomeExpertiseFrameworkChart)
