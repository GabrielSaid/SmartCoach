'use client'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
const chartData = [
  { month: 'Jan', desktop: 186 },
  { month: 'Fev', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Abr', desktop: 273 },
  { month: 'Mai', desktop: 209 },
  { month: 'Jun', desktop: 214 }
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export default function RadarCard() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      {/* @ts-ignore */}
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="month" />
        <PolarGrid />
        <Radar
          dataKey="desktop"
          fill="var(--color-desktop)"
          fillOpacity={0.6}
          dot={{
            r: 4,
            fillOpacity: 1
          }}
        />
      </RadarChart>
    </ChartContainer>
  )
}
