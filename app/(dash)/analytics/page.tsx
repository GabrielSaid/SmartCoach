import React from 'react'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import RadarCard from '@/components/radar-chart'

const spiderChartData = {
  labels: ['Força', 'Resistência', 'Velocidade', 'Flexibilidade', 'Equilíbrio'],
  datasets: [
    {
      label: 'Seu progresso',
      data: [65, 75, 70, 80, 60],
      backgroundColor: 'rgba(249, 115, 22, 0.2)',
      borderColor: 'rgb(249, 115, 22)',
      borderWidth: 2
    }
  ]
}

const spiderChartOptions = {
  scales: {
    r: {
      angleLines: {
        color: 'rgba(255, 255, 255, 0.2)'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)'
      },
      pointLabels: {
        color: 'white'
      },
      ticks: {
        color: 'white',
        backdropColor: 'transparent'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between p-4">
        <button className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Análise de Progresso</h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 p-4">
        <div className="mb-6">
          <button className="flex w-full items-center justify-between rounded-lg p-3">
            <span className="font-semibold">Últimos 30 dias</span>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="mb-6 rounded-lg p-4">
          <h2 className="mb-4 text-lg font-semibold">
            Visão Geral do Desempenho
          </h2>
          <div className="h-64 w-full">
            <RadarCard />
          </div>
        </div>

        <div className="space-y-4">
          {[
            'Força',
            'Resistência',
            'Velocidade',
            'Flexibilidade',
            'Equilíbrio'
          ].map((metric, index) => (
            <div key={index} className="rounded-lg p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{metric}</h3>
                <span className="font-semibold text-orange-500">
                  {spiderChartData.datasets[0].data[index]}%
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-700">
                <div
                  className="h-2.5 rounded-full bg-orange-500"
                  style={{
                    width: `${spiderChartData.datasets[0].data[index]}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
