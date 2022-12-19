import React from 'react'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
} from 'chart.js'

import styles from './styles.module.css'

import type { FeedbackRatingsCount } from '../../types/feedback'

interface Props {
  data: FeedbackRatingsCount,
}

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  BarElement,
)

export default function RatingsChart(props: Props): React.ReactElement {
  const { data } = props
  const canvasRef = React.useRef<HTMLCanvasElement>()

  React.useEffect(function () {
    if (typeof canvasRef.current === 'undefined') {
      return
    }

    const chart = new Chart(canvasRef.current, {
      data: {
        datasets: [
          {
            backgroundColor: [
              '#e94f65',
              '#e8915a',
              '#ebd157',
              '#cbeb57',
              '#4ad8de',
            ],
            borderWidth: 0,
            data: Object.values(data),
          },
        ],
        labels: [1, 2, 3, 4, 5],
      },
      options: {
        animation: false,
        aspectRatio: 3,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return Number(value) % 1 === 0 ? value : undefined
              },
            },
          },
        }
      },
      type: 'bar',
    })

    return function () {
      chart.destroy()
    }
  }, [data])

  return <canvas className={styles['ratings-chart']} ref={canvasRef}/>
}
