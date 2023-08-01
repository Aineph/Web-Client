/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import React, { useMemo } from "react"
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { generateDistinctColors } from "../../../../../utils/generateDistinctColors"

interface HomeExpertiseLanguageChartProps {
  entries: Array<{
    label: string
    value: number
  }>
}

ChartJS.register(ArcElement, Tooltip, Legend)

const HomeExpertiseLanguageChart: React.FC<HomeExpertiseLanguageChartProps> = ({
  entries,
}) => {
  const labels = useMemo(() => entries.map(entry => entry.label), [entries])
  const data = useMemo(() => entries.map(entry => entry.value), [entries])

  return (
    <Doughnut
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: generateDistinctColors(entries.length),
          },
        ],
      }}
      options={{
        events: [],
        plugins: {
          legend: {
            display: true,
          },
        },
      }}
    />
  )
}

export default React.memo(HomeExpertiseLanguageChart)
